// -----------------------------------------------------------
// 🔄 MÉMOIRE UTILISATEUR
// -----------------------------------------------------------

const sessions = new Map<string, any[]>();

const userData = new Map<
  string,
  {
    name?: string;
    gender?: "male" | "female" | "unknown";
    level?: string;
    goals?: string[];
    issues?: string[];
    preferences?: string[];
  }
>();

export function getMemory(userId: string) {
  if (!sessions.has(userId)) sessions.set(userId, []);
  return sessions.get(userId)!;
}

export function saveMessage(userId: string, msg: any) {
  getMemory(userId).push(msg);
}

export function getUserData(userId: string) {
  if (!userData.has(userId)) {
    userData.set(userId, {
      gender: "unknown",
      goals: [],
      issues: [],
      preferences: [],
    });
  }
  return userData.get(userId)!;
}

export function updateUserData(userId: string, newData: any) {
  const data = getUserData(userId);
  Object.assign(data, newData);
}