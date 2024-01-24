enum Roles {
	// SUPER_ADMIN = "super_admin",
	ADMIN = "admin",
	MANAGER = "manager",
}
enum ContractStatus {
	PAID = "paid",
	DEBT = "debt",
}

enum ClientBalanceOperationStatus {
	DEBT = "debt",
	FILL = "fill",
}

enum ManufacturerBalanceStatus {
	INCOME = "income",
	OUTCOME = "outcome",
}

enum PaymentType {
	CASH = "cash",
	CARD = "card",
	TRANSFER = "transfer",
}

export {
	Roles,
	ContractStatus,
	PaymentType,
	ManufacturerBalanceStatus,
	ClientBalanceOperationStatus,
};
