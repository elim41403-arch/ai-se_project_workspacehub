import { describe, expect, it } from "vitest";
import type { Project, Task } from "../types/models";
import { buildProjectWithTaskCount } from "./projectMetrics";

const project: Project = {
  _id: "project-1",
  organizationId: "org-1",
  name: "Project One",
  description: "Test project",
  createdBy: "user-1",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const taskForProject = (id: string, projectId: string): Task => ({
  _id: id,
  organizationId: "org-1",
  projectId,
  title: `Task ${id}`,
  description: "Test task",
  status: "todo",
  priority: "medium",
  assignedTo: null,
  dueDate: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
});

describe("buildProjectWithTaskCount", () => {
  it("returns a zero task count when there are no tasks", () => {
    expect(buildProjectWithTaskCount(project, [])).toEqual({
      ...project,
      taskCount: 0,
    });
  });

  it("counts only tasks belonging to the project", () => {
    const tasks = [
      taskForProject("task-1", project._id),
      taskForProject("task-2", project._id),
      taskForProject("task-other", "project-2"),
    ];

    expect(buildProjectWithTaskCount(project, tasks)).toEqual({
      ...project,
      taskCount: 2,
    });
  });
});