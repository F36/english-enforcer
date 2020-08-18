function detectorFactory(detector, minPercentProbability) {
    return function (message) {
        const result = detector
            .detect(message)
            .reduce(
                (acc, cur) => cur[1] > acc[1] ? cur : acc,
                ['', -Infinity]
            );
        
        if (Math.floor(result[1] * 100) < minPercentProbability) {
            return;
        }

        return result;
    }
}

module.exports = {
    detectorFactory
}
