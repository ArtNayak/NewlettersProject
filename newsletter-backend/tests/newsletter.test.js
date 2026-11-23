import request from "supertest";
import app from "../server.js";

describe("Newsletter API", () => {
  it("should fetch latest newsletters", async () => {
    const res = await request(app).get("/api/newsletters/latest");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
