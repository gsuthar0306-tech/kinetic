export type StoredAccount = {
  name: string;
  email: string;
  password: string;
};

const accountStorageKey = "kinetic-account";

export function getStoredAccounts(): StoredAccount[] {
  const raw = localStorage.getItem(accountStorageKey);

  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error("Stored accounts must be an array.");
    }

    return parsed.filter(isStoredAccount);
  } catch {
    localStorage.removeItem(accountStorageKey);
    return [];
  }
}

export function saveStoredAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(accountStorageKey, JSON.stringify(accounts));
}

function isStoredAccount(value: unknown): value is StoredAccount {
  if (!value || typeof value !== "object") {
    return false;
  }

  const account = value as Record<string, unknown>;

  return (
    typeof account.name === "string" &&
    typeof account.email === "string" &&
    typeof account.password === "string"
  );
}
