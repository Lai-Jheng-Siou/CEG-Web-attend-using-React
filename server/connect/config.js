const config = {
    port: 3001,
    db: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '0000',
        database: 'attend'
    }
}

const sqlQuery = {
    insert: {
        addAttend: "INSERT INTO empattend(empId, atdDate, atdTime, Ip, buildId) VALUES(?, ?, ?, ?, ?)",
        addBuilding: "INSERT INTO building(buildId, buildName, addr) VALUES(?, ?, ?)",
        addEmpInfo: "INSERT INTO empInfo(empId, pasd, name, depName, access) VALUES(?, ?, ?, ?, ?)"
    },

    read: {
        readAttend: "SELECT empId, DATE_FORMAT(atdDate, '%Y/%m/%d') AS atdDate, atdTime, Ip, BuildId FROM EMPATTEND WHERE empId = ?",
        readBuilding: "SELECT * FROM BUILDING",
        readEmpInfo: "SELECT * FROM empinfo where empId = ?",
        readEmpAllInfo: "SELECT * FROM empinfo"
    },

    update: {
        updateEmpInfo: "",
        updateBuilding: ""
    },

    delete: {
        delEmpInfo: "",
        delBuilding: ""
    },
}

module.exports = { config, sqlQuery }