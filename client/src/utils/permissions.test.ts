import { describe, expect, it } from "vitest";
import type { User, UserRole } from "../types/models";
import { canCreateProject, isPrivilegedRole } from "./permissions";

const userWithRole = (role: UserRole): User => ({
  _id: "user-1",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  organizationId: "org-1",
  role,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
});

describe("isPrivilegedRole", () => {
  it.each([
    ["owner", true],
    ["admin", true],
    ["member", false],
    [null, false],
  ] as const)("returns %s for role %s", (role, expected) => {
    expect(isPrivilegedRole(role)).toBe(expected);
  });
});

describe("canCreateProject", () => {
  it.each([
    ["owner", true],
    ["admin", true],
    ["member", false],
  ] as const)("returns %s for a %s user", (role, expected) => {
    expect(canCreateProject(userWithRole(role))).toBe(expected);
  });

  it("returns false when the user is missing", () => {
    expect(canCreateProject(null)).toBe(false);
  });
});