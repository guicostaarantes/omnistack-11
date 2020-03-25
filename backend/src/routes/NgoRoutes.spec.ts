import request from "supertest";
import app from "../app";
import connection from "../database/connection";

beforeAll(async done => {
  if (process.env.CONFIG_ENV === "production") {
    throw new Error("Should not run tests in production environment.");
  } else {
    done();
  }
});

describe("POST /ngo", () => {
  test("It should return status 200 OK", async () => {
    const response = await request(app).get("/ngo");
    expect(response.status).toBe(200);
  });
});

describe("GET /ngo", () => {
  test("It should return status 200 OK", async () => {
    const response = await request(app).get("/ngo");
    expect(response.status).toBe(200);
  });
});

afterAll(async done => {
  await connection.destroy();
  done();
});
