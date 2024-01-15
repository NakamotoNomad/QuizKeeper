// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";

/// @custom:security-contact nakamotonomad@outlook.com
contract QuizKeeper is ERC1155, AccessControlEnumerable, ERC1155Burnable, ERC1155Pausable, ERC1155Supply {

    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant CONTENT_MOD_ROLE = keccak256("CONTENT_MOD_ROLE");

    uint256 public constant MAIN_ID = 0;

    error CourseNotFound(uint id);

    struct Course {
        uint id;
        string title;
        uint8 numCorrectAnswersNeeded;
        uint uploadDate;
        uint closeDate;
    }

    Course[] public courses;

    mapping(uint => uint8[]) courseAnswers; // courseId => answers
    mapping(uint => mapping(address => uint8[])) userAnswers; // courseId => (user => answers)
    mapping(uint => address[]) courseUsers; // courseId => array of user addresses

    mapping(address => uint) votedForPause; // content mod => timestamp
    mapping(address => uint) votedForUnpause; // content mod => timestamp

    constructor() ERC1155("ipfs://TODO/{id}.json") { // TODO: add initial URI
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CONTENT_MOD_ROLE, msg.sender);
        /*
         TODO: how to handle initial course as that can't be closed after revealing the answers?
         Option 1: Change around the sequence of answers for the main course every month so previous results can't be copied.
         Option 2: New role for minting the main NFT. Then the user can't answer the questions directly over the smart
         contract but is forced to use the webapp. If the webapp validates the answers as correct it mints and sends
         the NFT to the user.
         */
    }

    function addCourse(uint id, string calldata title, uint8 numCorrectAnswersNeeded) public onlyRole(CONTENT_MOD_ROLE) {
        courses.push(Course({ id: id, title: title, numCorrectAnswersNeeded: numCorrectAnswersNeeded, uploadDate: block.timestamp, closeDate: 0 }));
    }

    function revealCourseAnswers(uint id, uint8[] calldata answers) external onlyRole(CONTENT_MOD_ROLE) {
        Course storage course = findCourseStorage(id);
        require(answers.length >= course.numCorrectAnswersNeeded, "You need more correct answers than questions.");
        course.closeDate = block.timestamp;
        courseAnswers[id] = answers;
        for (uint8 i = 0; i < courseUsers[id].length; i++) {
            address currentUser = courseUsers[id][i];
            uint8 numCorrectAnswers = 0;
            uint8[] memory currentUserAnswers = userAnswers[id][currentUser];
            if (currentUserAnswers.length != answers.length) {
                continue; // user provided wrong number of answers, ignoring their entry (no NFT for you!)
            }
            for (uint8 j = 0; j < answers.length; j++) {
                if (answers[j] == currentUserAnswers[j]) {
                    numCorrectAnswers++;
                }
            }
            if (numCorrectAnswers >= course.numCorrectAnswersNeeded) {
                // Congrats, course passed!
                _mint(currentUser, id, 1, "");
            }
        }
    }

    function submitUserAnswer(uint id, uint8[] calldata answers) external {
        Course memory course = findCourseMemory(id);
        require(course.closeDate < block.timestamp);
        userAnswers[id][msg.sender] = answers;
        courseUsers[id].push(msg.sender);
    }

    // Two functions to find a course. If one needs to alter the course you need the storage option
    // but if read-only is enough for that context one can use the memory option for better gas efficiency.
    function findCourseMemory(uint id) internal view returns(Course memory) {
        for (uint i = 0; i < courses.length; i++) {
            if (courses[i].id == id) {
                return courses[i];
            }
        }
        revert CourseNotFound(id);
    }

    function findCourseStorage(uint id) internal view returns(Course storage) {
        for (uint i = 0; i < courses.length; i++) {
            if (courses[i].id == id) {
                return courses[i];
            }
        }
        revert CourseNotFound(id);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function voteForPause() external onlyRole(CONTENT_MOD_ROLE) {
        votedForPause[msg.sender] = block.timestamp;

        uint8 numVotes = 0;
        for (uint8 i = 0; i < getRoleMemberCount(CONTENT_MOD_ROLE); i++) {
            if (votedForPause[getRoleMember(CONTENT_MOD_ROLE, i)] > block.timestamp - 2 days) {
                numVotes++;
            }
        }

        // Check if at least two-thirds of the members have voted for pause
        if (3 * numVotes >= 2 * getRoleMemberCount(CONTENT_MOD_ROLE)) {
            _pause();
            resetPausingMapping(votedForUnpause);
        }
    }

    function voteForUnpause() external onlyRole(CONTENT_MOD_ROLE) {
        votedForUnpause[msg.sender] = block.timestamp;

        uint8 numVotes = 0;
        for (uint8 i = 0; i < getRoleMemberCount(CONTENT_MOD_ROLE); i++) {
            if (votedForUnpause[getRoleMember(CONTENT_MOD_ROLE, i)] > block.timestamp - 2 days) {
                numVotes++;
            }
        }

        // Check if at least two-thirds of the members have voted for unpause
        if (3 * numVotes >= 2 * getRoleMemberCount(CONTENT_MOD_ROLE)) {
            _unpause();
            resetPausingMapping(votedForPause);
        }
    }

    // After the contract was paused or unpaused we reset the state of the other mapping in case there were
    // multiple emergency pauses within the 2 day timeframe
    function resetPausingMapping(mapping(address => uint) storage pausingMapping) internal {
        for (uint8 i = 0; i < getRoleMemberCount(CONTENT_MOD_ROLE); i++) {
            pausingMapping[getRoleMember(CONTENT_MOD_ROLE, i)] = 0;
        }
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values) internal override(ERC1155, ERC1155Pausable, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}