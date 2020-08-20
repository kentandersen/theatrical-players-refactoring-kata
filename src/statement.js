const PlayTypeEnum = {
    TRAGEDY: 'tragedy',
    COMEDY: 'comedy',
    HISTORY: 'history',
    PASTORAL: 'pastoral'
}

function calculateVolumeCredit({ type }, audience) {
    if (audience < 30) return 0

    // volume credit for every attendees over 30
    const credit = audience - 30
    if (type !== PlayTypeEnum.COMEDY) return credit
    
    // extra credit for every ten? comedy attendees
    const extraCredit = Math.floor(audience / 5)
    return credit + extraCredit
}

function calculateAmount({ type }, audience) {
    switch (type) {
        case PlayTypeEnum.TRAGEDY: {
            const amount = 40000
            if (audience <= 30) return amount
            return amount + (1000 * (audience - 30))
        }
        case PlayTypeEnum.COMEDY: {
            const amount = 30000 + (300 * audience)
            if (audience <= 20) return amount
            return amount + 10000 + 500 * (audience - 20)
        }
        case PlayTypeEnum.HISTORY: {
            return 50000
        }
        case PlayTypeEnum.PASTORAL: {
            return 60000
        }
        default:
            throw new Error(`unknown type: ${type}`)
    }
}

function getPlay(plays, id) {
    return plays[id];
}

function getStatementLine(performance, plays) {
    const { playID, audience } = performance
    const play = getPlay(plays, playID);
    const amount = calculateAmount(play, audience)
    const volumeCredit = calculateVolumeCredit(play, audience)

    return {
        play,
        audience,
        amount,
        volumeCredit
    }
}

exports.getStatementLine = getStatementLine;
