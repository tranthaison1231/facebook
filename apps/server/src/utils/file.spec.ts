import { expect, test } from "vitest";
import { getFileName } from "./file";

describe("File utility", () => {
  test("Check getFileName have correct output", () => {
    //Arrange
    const fileName = "file.txt";
    //Act
    const newFileName = getFileName(fileName);

    //Assert
    expect(newFileName).toContain(fileName.split(".").pop());
  });
});
