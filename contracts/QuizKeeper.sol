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
        uint8 id;
        string title;
        uint8 numCorrectAnswersNeeded;
        uint uploadDate;
        uint closeDate;
    }

    modifier fiveAnswers(uint8[] calldata answers) {
        require(answers.length == 5);
        _;
    }

    modifier notMainCourse(uint8 id) {
        require(id != 0);
        _;
    }

    modifier onlyWithMainNft(address user) {
        require(balanceOf(msg.sender, MAIN_ID) > 0, "Caller does not own the main NFT");
        _;
    }

    Course[] public updateCourses;

    mapping(address => uint8[]) private mainCourseUserAnswers;
    address[] private mainCourseUsers;

    mapping(uint => uint8[]) courseAnswers; // courseId => answers
    mapping(uint => mapping(address => uint8[])) userAnswers; // courseId => (user => answers)
    mapping(uint => address[]) courseUsers; // courseId => array of user addresses

    mapping(address => uint) votedForPause; // content mod => timestamp
    mapping(address => uint) votedForUnpause; // content mod => timestamp

    constructor() ERC1155("ipfs://TODO/{id}.json") { // TODO: add initial URI
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CONTENT_MOD_ROLE, msg.sender);
    }

    function addCourse(uint8 id, string calldata title, uint8 numCorrectAnswersNeeded) public onlyRole(CONTENT_MOD_ROLE) notMainCourse(id) {
        updateCourses.push(Course({id: id, title: title, numCorrectAnswersNeeded: numCorrectAnswersNeeded, uploadDate: block.timestamp, closeDate: type(uint256).max}));
    }

    function revealMainCourseAnswers(uint8[] calldata answers) external onlyRole(CONTENT_MOD_ROLE) fiveAnswers(answers) {
        for (uint8 i = 0; i < mainCourseUsers.length; i++) {
            uint8 numCorrectAnswers = 0;
            for (uint8 j = 0; j < answers.length; j++) {
                if (answers[j] == mainCourseUserAnswers[mainCourseUsers[i]][j]) {
                    numCorrectAnswers++;
                }
            }
            if (numCorrectAnswers >= 4) {
                // Congrats, course passed!
                _mint(mainCourseUsers[i], MAIN_ID, 1, "");
            }
            delete mainCourseUserAnswers[mainCourseUsers[i]];
        }
        delete mainCourseUsers;
    }

    function revealCourseAnswers(uint8 id, uint8[] calldata answers) external onlyRole(CONTENT_MOD_ROLE) notMainCourse(id) {
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
                // Congrats, main course passed!
                _mint(currentUser, id, 1, "");
            }
        }
    }

    function submitUserAnswer(uint8 id, uint8[] calldata answers) external notMainCourse(id) onlyWithMainNft(msg.sender) {
        require(userAnswers[id][msg.sender].length == 0, "User has already submitted answers");
        Course memory course = findCourseMemory(id);
        require(course.closeDate > block.timestamp);
        userAnswers[id][msg.sender] = answers;
        courseUsers[id].push(msg.sender);
    }

    function submitMainCourseUserAnswer(uint8[] calldata answers) external fiveAnswers(answers) {
        require(mainCourseUserAnswers[msg.sender].length == 0, "User has already submitted answers");
        mainCourseUserAnswers[msg.sender] = answers;
        mainCourseUsers.push(msg.sender);
    }

    // Two functions to find a course. If one needs to alter the course you need the storage option
    // but if read-only is enough for that context one can use the memory option for better gas efficiency.
    function findCourseMemory(uint8 id) internal view returns (Course memory) {
        for (uint i = 0; i < updateCourses.length; i++) {
            if (updateCourses[i].id == id) {
                return updateCourses[i];
            }
        }
        revert CourseNotFound(id);
    }

    function findCourseStorage(uint8 id) internal view returns (Course storage) {
        for (uint i = 0; i < updateCourses.length; i++) {
            if (updateCourses[i].id == id) {
                return updateCourses[i];
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