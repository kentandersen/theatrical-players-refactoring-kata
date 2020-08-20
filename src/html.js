const { getStatementLine } = require('./statement')
const { sumBy, formatMoney } = require('./utils')

function renderStatementLine(line) {
    const { play, amount, audience} = line
    return `
<tr>
    <td>${play.name}</td>
    <td>${formatMoney(amount)}</td>;
    <td>${audience}</td>
<tr>
`
}

function renderStatement(statementLines) {
    const totalAmount = sumBy(statementLines, ({ amount }) => amount);
    const volumeCredits = sumBy(statementLines, ({ volumeCredit }) => volumeCredit);
    
    return `
<table>
    <tbody>
    ${statementLines.map(renderStatementLine).join('\n')}
    </tbody>
    <tfoot>
        <tr>
            <td>Amount owed</td>
            <td>${formatMoney(totalAmount)}</td>
        </tr>
        <tr>
            <td>Earned credits</td>
            <td>${volumeCredits}<td>
        </tr>
    </tfoot>
</table>
`
}

function htmlStatement({ customer, performances }, plays) {
    const statementLines = performances.map((performance) => getStatementLine(performance, plays))
    return `
<!doctype html>
<html lang="en">
    <head>
    <title>Statement for ${customerName}</title>
    </head>

    <body>
        ${renderStatement(statementLines)}
    </body>
</html>
`
}

module.exports = htmlStatement;
