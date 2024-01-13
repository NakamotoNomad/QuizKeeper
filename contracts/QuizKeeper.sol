// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/// @custom:security-contact nakamotonomad@outlook.com
contract QuizKeeper is ERC1155, AccessControl, ERC1155Burnable, ERC1155Pausable, ERC1155Supply {

    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant CONTENT_MOD_ROLE = keccak256("CONTENT_MOD_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE"); // TODO: make the pauser role like a multisig (at least 66% of all content moderators must agree)

    uint256 public constant MAIN_ID = 0;

    error CourseNotFound(uint id);

    struct Course {
        uint id;
        string title;
        uint uploadDate;
        uint closeDate;
    }

    Course[] public courses;

    mapping(uint => uint[]) courseAnswers; // courseId => answers
    mapping(uint => mapping(address => uint[])) userAnswers; // courseId => (user => answers)

    constructor() ERC1155("ipfs://TODO/{id}.json") { // TODO: add initial URI
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        addCourse(0, "Main course");
        /*
         TODO: how to handle initial course as that can't be closed after revealing the answers?
         Option 1: Change around the sequence of answers for the main course every month so previous results can't be copied.
         Option 2: New role for minting the main NFT. Then the user can't answer the questions directly over the smart
         contract but is forced to use the webapp. If the webapp validates the answers as correct it mints and sends
         the NFT to the user.
         */
    }

    function addCourse(uint id, string title) public onlyRole(CONTENT_MOD_ROLE) {
        courses.push(Course({ id: id, title: title, uploadDate: block.timestamp, closeDate: 0 }));
    }

    function revealCourseAnswers(uint id, uint[] calldata answers) external onlyRole(CONTENT_MOD_ROLE) {
        Course course = findCourse(id);
        course.closeDate = block.timestamp;
        courseAnswers.push(id, answers);
        // TODO: check user answers and give out NFTs
    }

    function submitUserAnswer(uint id, uint[] calldata answers) external {
        Course course = findCourse(id);
        require(course.closeDate < block.timestamp);
        userAnswers[id][msg.sender] = answers;
    }

    function findCourse(uint id) internal returns(Course) {
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

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

//    function mint(address account, uint256 id, uint256 amount, bytes memory data) public {
//        _mint(account, id, amount, data);
//    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values) internal override(ERC1155, ERC1155Pausable, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}