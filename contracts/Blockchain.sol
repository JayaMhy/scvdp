//SPDX-License-Identifier:MIT
pragma solidity ^0.8.14;

// smart contract starts here
contract Blockchain {
    struct Developer {
        uint256 id;
        string name;
        string date_of_joining;
    }

    struct MlResult {
        uint256 serial_no;
        string result;
        string vulscore;
        string nonvulscore;
        string filename;
        uint256 ptimestamp;
        uint256 utimestamp;
        string filepath;
        string developer_id;
    }

    uint256 total_ml_result_count = 0;

    mapping(uint256 => Developer) developers;
    mapping(uint256 => Developer) lead_developers;
    mapping(uint256 => MlResult) ml_results;

    // add Developers
    function addDeveloper(
        uint256 blockchain_address,
        uint256 id,
        string memory name,
        string memory date_of_joining
    ) public {
        developers[blockchain_address] = Developer(id, name, date_of_joining);
    }

    // get Developers
    function getDeveloper(uint256 blockchain_address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory
        )
    {
        Developer memory developer = developers[blockchain_address];
        return (developer.id, developer.name, developer.date_of_joining);
    }

    // add Lead Developers
    function addLeadDeveloper(
        uint256 blockchain_address,
        uint256 id,
        string memory name,
        string memory date_of_joining
    ) public {
        lead_developers[blockchain_address] = Developer(
            id,
            name,
            date_of_joining
        );
    }

    // get Lead Developers
    function getLeadDeveloper(uint256 blockchain_address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory
        )
    {
        Developer memory ld = lead_developers[blockchain_address];
        return (ld.id, ld.name, ld.date_of_joining);
    }

    // test result from ML to UI
    function addMlResult(
        string memory result,
        string memory vulscore,
        string memory nonvulscore,
        string memory filename,
        uint256 ptimestamp,
        uint256 utimestamp,
        string memory filepath,
        string memory developer_id
    ) public {
        uint256 serial_no = total_ml_result_count;
        ml_results[total_ml_result_count] = MlResult(
            serial_no,
            result,
            vulscore,
            nonvulscore,
            filename,
            ptimestamp,
            utimestamp,
            filepath,
            developer_id
        );

        total_ml_result_count = total_ml_result_count + 1;
    }

    //return all result for viewmore
    function getAllMlResult() public view returns (MlResult[] memory) {
        MlResult[] memory details = new MlResult[](total_ml_result_count);
        for (uint256 i = 0; i < total_ml_result_count; i++) {
            details[i] = ml_results[i];
        }
        return details;
    }

    function getMlResultBySerialNo(uint256 serial_no)
        public
        view
        returns (MlResult memory)
    {
        return ml_results[serial_no];
    }
}
