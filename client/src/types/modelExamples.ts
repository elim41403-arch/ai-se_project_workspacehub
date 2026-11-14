import type { Project, ProjectWithTaskCount, Task } from "./models";
import { buildProjectWithTaskCount } from "../utils/projectMetrics";

export const exampleProject: Project = {
  _id: "proj_01JAX7M6Q4K8N2P5R9T3V1W0YZ",
  organizationId: "org_01JAX7K2B5D9F3H6J0L4M8N1PQ",
  name: "Website Redesign",
  description:
    "Refresh the company website and improve the customer experience.",
  createdBy: "user_01JAX7H8C2E6G0J4L8N1P5R9ST",
  createdAt: "2026-10-15T09:30:00.000Z",
  updatedAt: "2026-11-02T14:45:00.000Z",
};

export const exampleTask: Task = {
  _id: "task_01JAX8C3D7F1H5K9M2P6R0T4VW",
  organizationId: "org_01JAX7K2B5D9F3H6J0L4M8N1PQ",
  projectId: exampleProject._id,
  title: "Create homepage wireframes",
  description: "Prepare responsive wireframes for review by the design team.",
  status: "in_progress",
  priority: "high",
  assignedTo: "user_01JAX7H8C2E6G0J4L8N1P5R9ST",
  dueDate: "2026-11-20T17:00:00.000Z",
  createdAt: "2026-10-20T11:15:00.000Z",
  updatedAt: "2026-11-04T16:20:00.000Z",
};

export const exampleProjectWithTaskCount: ProjectWithTaskCount =
  buildProjectWithTaskCount(exampleProject, [exampleTask]);
