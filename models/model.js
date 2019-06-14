function sendTestJsonResponse(req, res, next) {
	const data = { status: 'it works!' };
	res.json(JSON.stringify(data));
}

module.exports = {
	sendTestJsonResponse,
}
