import { loadCsv, saveCsv } from "@/lib/jnu-doc";

const csv = loadCsv("/Users/moon/JnJ/Developments/Servers/backend/ts-graphql-sqlite-prisma/src/tests/mock/test.csv");
console.log(csv);

const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
  { a: 7, b: 8, c: 9 },
];

saveCsv("/Users/moon/JnJ/Developments/Servers/backend/ts-graphql-sqlite-prisma/src/tests/mock/test_2.csv", data);
