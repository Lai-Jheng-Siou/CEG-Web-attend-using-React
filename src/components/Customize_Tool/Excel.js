import ExcelJs from 'exceljs'


export function ExcelExport(info, title = 'attend') {
    const Workbook = new ExcelJs.Workbook()

    const sheet = Workbook.addWorksheet(title)

    let ary = []
    for(let i = 0; i < info.length; i++) {
        let tmpAry = []
        for(let j = 0; j < info[i].length; j++) {
            tmpAry.push(info[i][j])
        }
        ary.push(tmpAry)
    }

    ary.forEach(row => {
        sheet.addRow(row);
    });

    Workbook.xlsx.writeBuffer()
    .then((content) => {
        const link = document.createElement("a");
        const blobData = new Blob([content], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
        });
        link.download = `${title}.xlsx`;
        link.href = URL.createObjectURL(blobData);
        link.click();
    })
}