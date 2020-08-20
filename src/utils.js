function sumBy(arr, getValue) {
    return arr.reduce((acc, item) => acc + getValue(item), 0)
}

const { format } = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

function formatMoney(amountInCent) {
    return format(amountInCent / 100)
}

exports.sumBy = sumBy
exports.formatMoney = formatMoney
