//SPDX-License-Identifier:MIT
pragma solidity ^0.8.14;

// smart contract starts here
contract Blockchain {
    struct Developer {
        // structure for Developer
        uint256 developer_id;
        string developer_name;
        string developer_doj;
    }

    struct leadDeveloper {
        // structure for leadDeveloper
        uint256 leaddeveloper_id;
        string leaddeveloper_name;
        string leaddeveloper_doj;
    }

    struct blockchainAdmin {
        // structure for blockchainAdmin
        uint256 blockchainadmin_id;
        string blockchainadmin_name;
        string blockchainadmin_doj;
    }

    struct superAdmin {
        // structure for superAdmin
        uint256 superadmin_id;
        string superadmin_name;
        string superadmin_doj;
    }

    struct code {
        // structure for code upload
        string scode;
        uint256 developer_id;
        string utimestamp;
    }
    struct testcode {
        // structure for test code (UI to ML)
        string tcode;
    }
    struct mlResult {
        string result;
        string ptimestamp;
        string vulscore;
    }
    struct toIPFS {
        uint256 developer_id;
        string code;
        string utimestamp;
        string result;
        string ptimestamp;
        string vulscore;
        uint256 leaddeveloper_id;
        string rtimestamp;
    }
    struct fromIPFS {
        uint256 developer_id;
        string code;
        string utimestamp;
        string result;
        string ptimestamp;
        string vulscore;
        uint256 leaddeveloper_id;
        string rtimestamp;
        string filehash;
        string gtimestamp;
    }
    struct toBlockchain {
        uint256 leaddeveloper_id;
        uint256 developer_id;
        string code;
        string utimestamp;
        string result;
        string ptimestamp;
        string vulscore;
        string rtimestamp;
        string filehash;
        string gtimestamp;
        string pushtimestamp;
    }

    //different mappings are done here
    mapping(uint256 => Developer) developers;
    mapping(uint256 => leadDeveloper) leaddevelopers;
    mapping(uint256 => blockchainAdmin) blockchainadmins;
    mapping(uint256 => superAdmin) superadmins;
    mapping(uint256 => code) codes;
    mapping(uint256 => testcode) testcodes;
    mapping(uint256 => mlResult) mlResults;
    mapping(uint256 => toIPFS) toIPFSs;
    mapping(uint256 => fromIPFS) fromIPFSs;
    mapping(uint256 => toBlockchain) toBlockchains;

    // add Developers
    function addDeveloper(
        uint256 _developer_address,
        uint256 d_id,
        string memory d_name,
        string memory d_doj
    ) public {
        developers[_developer_address] = Developer(d_id, d_name, d_doj);
    }

    // get Developers
    function getDeveloper(uint256 _developer_address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory
        )
    {
        Developer memory d = developers[_developer_address];
        return (d.developer_id, d.developer_name, d.developer_doj);
    }

    // add Lead Developers
    function addLeadDeveloper(
        uint256 _leaddeveloper_address,
        uint256 ld_id,
        string memory ld_name,
        string memory ld_doj
    ) public {
        leaddevelopers[_leaddeveloper_address] = leadDeveloper(
            ld_id,
            ld_name,
            ld_doj
        );
    }

    // get Lead Developers
    function getLeadDeveloper(uint256 _leaddeveloper_address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory
        )
    {
        leadDeveloper memory ld = leaddevelopers[_leaddeveloper_address];
        return (
            ld.leaddeveloper_id,
            ld.leaddeveloper_name,
            ld.leaddeveloper_doj
        );
    }

    // add Blockchain Admin
    function addBlockchainAdmin(
        uint256 _blockchain_address,
        uint256 bca_id,
        string memory bca_name,
        string memory bca_doj
    ) public {
        blockchainadmins[_blockchain_address] = blockchainAdmin(
            bca_id,
            bca_name,
            bca_doj
        );
    }

    // get Blockchain Admin
    function getBlockchainAdmin(uint256 _blockchain_address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory
        )
    {
        blockchainAdmin memory bca = blockchainadmins[_blockchain_address];
        return (
            bca.blockchainadmin_id,
            bca.blockchainadmin_name,
            bca.blockchainadmin_doj
        );
    }

    // add Super Admin
    function addSuperAdmin(
        uint256 _superadmin_address,
        uint256 sa_id,
        string memory sa_name,
        string memory sa_doj
    ) public {
        superadmins[_superadmin_address] = superAdmin(sa_id, sa_name, sa_doj);
    }

    // get Super Admin
    function getSuperAdmin(uint256 _superadmin_address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory
        )
    {
        superAdmin memory sa = superadmins[_superadmin_address];
        return (sa.superadmin_id, sa.superadmin_name, sa.superadmin_doj);
    }

    //upload code
    function uploadCode(
        uint256 _developer_address,
        string memory scode,
        uint256 developer_id,
        string memory utimestamp
    ) public {
        codes[_developer_address] = code(scode, developer_id, utimestamp);
    }

    //check uploaded code
    function ckeckUploadedCode(uint256 _leaddeveloper_address)
        public
        view
        returns (
            string memory,
            uint256,
            string memory
        )
    {
        code memory c = codes[_leaddeveloper_address];
        return (c.scode, c.developer_id, c.utimestamp);
    }

    // send code for testing
    function sendCodeForTesting(
        uint256 _leaddeveloper_address,
        string memory tcode
    ) public {
        testcodes[_leaddeveloper_address] = testcode(tcode);
    }

    // check the sent code for testing
    function checkSentCode(uint256 _leaddeveloper_address)
        public
        view
        returns (string memory)
    {
        testcode memory tc = testcodes[_leaddeveloper_address];
        return (tc.tcode);
    }

    // test result from ML to UI
    function workMlResult(
        uint256 _blockchainadmin_address,
        string memory result,
        string memory ptimestamp,
        string memory vulscore
    ) public {
        mlResults[_blockchainadmin_address] = mlResult(
            result,
            ptimestamp,
            vulscore
        );
    }

    // get result from ML to UI
    function getResults(uint256 _blockchainadmin_address)
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        mlResult memory mlr = mlResults[_blockchainadmin_address];
        return (mlr.result, mlr.ptimestamp, mlr.vulscore);
    }

    // send result to IPFS for storage
    function sendResultIPFS(
        uint256 _leaddeveloper_address,
        uint256 developer_id,
        string memory code,
        string memory utimestamp,
        string memory result,
        string memory ptimestamp,
        string memory vulscore,
        uint256 leaddeveloper_id,
        string memory rtimestamp
    ) public {
        toIPFSs[_leaddeveloper_address] = toIPFS(
            developer_id,
            code,
            utimestamp,
            result,
            ptimestamp,
            vulscore,
            leaddeveloper_id,
            rtimestamp
        );
    }

    // check the result  to be send from IPFS for storage
    function CheckResultIPFS(uint256 _leaddeveloper_address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory
        )
    {
        toIPFS memory ti = toIPFSs[_leaddeveloper_address];
        return (
            ti.developer_id,
            ti.code,
            ti.utimestamp,
            ti.result,
            ti.ptimestamp,
            ti.vulscore,
            ti.leaddeveloper_id,
            ti.rtimestamp
        );
    }

    // from IPFS (file hash generation)
    function fileHashGen(
        uint256 _leaddeveloper_address,
        uint256 developer_id,
        string memory code,
        string memory utimestamp,
        string memory result,
        string memory ptimestamp,
        string memory vulscore,
        uint256 leaddeveloper_id,
        string memory rtimestamp,
        string memory filehash,
        string memory gtimestamp
    ) public {
        fromIPFSs[_leaddeveloper_address] = fromIPFS(
            developer_id,
            code,
            utimestamp,
            result,
            ptimestamp,
            vulscore,
            leaddeveloper_id,
            rtimestamp,
            filehash,
            gtimestamp
        );
    }

    // check the file hash to be send from IPFS
    function checkFileHashGen(uint256 _leaddeveloper_address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            string memory,
            string memory
        )
    {
        fromIPFS memory fi = fromIPFSs[_leaddeveloper_address];
        return (
            fi.developer_id,
            fi.code,
            fi.utimestamp,
            fi.result,
            fi.ptimestamp,
            fi.vulscore,
            fi.leaddeveloper_id,
            fi.rtimestamp,
            fi.filehash,
            fi.gtimestamp
        );
    }

    // to Blockchain (all info to store)
    function FinalBlockchain(
        uint256 _superadmin_address,
        uint256 leaddeveloper_id,
        uint256 developer_id,
        string memory code,
        string memory utimestamp,
        string memory result,
        string memory ptimestamp,
        string memory vulscore,
        string memory rtimestamp,
        string memory filehash,
        string memory gtimestamp,
        string memory pushtimestamp
    ) public {
        toBlockchains[_superadmin_address] = toBlockchain(
            leaddeveloper_id,
            developer_id,
            code,
            utimestamp,
            result,
            ptimestamp,
            vulscore,
            rtimestamp,
            filehash,
            gtimestamp,
            pushtimestamp
        );
    }

    // Check details of Blockchain (all info to be store)
    function FinalBlockchain(uint256 _superadmin_address)
        public
        view
        returns (
            uint256 leaddeveloper_id,
            uint256 developer_id,
            string memory code,
            string memory utimestamp,
            string memory result,
            string memory ptimestamp,
            string memory vulscore,
            string memory rtimestamp,
            string memory filehash,
            string memory gtimestamp,
            string memory pushtimestamp
        )
    {
        toBlockchain memory tb = toBlockchains[_superadmin_address];
        return (
            tb.leaddeveloper_id,
            tb.developer_id,
            tb.code,
            tb.utimestamp,
            tb.result,
            tb.ptimestamp,
            tb.vulscore,
            tb.rtimestamp,
            tb.filehash,
            tb.gtimestamp,
            tb.pushtimestamp
        );
    }
}
