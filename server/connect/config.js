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
        readEmpAllInfo: "SELECT * FROM empinfo limit ? offset ?",
        readTableLen: "SELECT COUNT(*) AS TOTAL_ROWS FROM ??"
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