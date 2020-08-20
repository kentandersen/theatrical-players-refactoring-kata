const { getStatementLine } = require('./statement')
const { sumBy, formatMoney } = require('./utils')

function formatStatementLine(line) {
    const { play, amount, audience} = line
    return ` ${play.name}: ${formatMoney(amount)} (${audience} seats)`;
}

function formatStatement(customerName, statementLines) {
    const totalAmount = sumBy(statementLines, ({ amount }) => amount);
    const volumeCredits = sumBy(statementLines, ({ volumeCredit }) => volumeCredit);
    
    return `
Statement for ${customerName}
${statementLines.map(formatStatementLine).join('\n')}
Amount owed is ${formatMoney(totalAmount)}
You earned ${volumeCredits} credits
`.trimLeft()
}

function textStatement({ customer, performances }, plays) {
    const statementLines = performances.map((performance) => getStatementLine(performance, plays))
    return formatStatement(customer, statementLines)
}

module.exports = textStatement;
