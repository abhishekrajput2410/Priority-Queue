const created = (res, data) => res.status(201).json(data);
const ok = (res, data) => res.status(200).json(data);
const badRequest = (res, message) => res.status(400).json({ message });
const unauthorized = (res, message) => res.status(401).json({ message });
const forbidden = (res, message) => res.status(403).json({ message });
const notFound = (res, message) => res.status(404).json({ message });

module.exports = { created, ok, badRequest, unauthorized, forbidden, notFound };
