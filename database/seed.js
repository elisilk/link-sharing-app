import { fakerEN_US as faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

// Config/environment variables

// eslint-disable-next-line node/no-process-env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

// eslint-disable-next-line node/no-process-env
const testingUserEmail = process.env.TESTING_USER_EMAIL;
if (!testingUserEmail) {
  console.error("Have you forgot to add TESTING_USER_EMAIL to your .env file?");
  process.exit();
}

// Logging

function logErrorAndExit(tableName, error) {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  );
  process.exit(1);
}

function logStep(stepMessage) {
  console.warn(stepMessage);
}

// Primary Test User

// async function PrimaryTestUserExists() {
//   logStep("Checking if primary test user exists...");
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("id, username")
//     .match({
//       first_name: "Test",
//       last_name: "Account",
//     })
//     .single();

//   if (error) {
//     console.warn("Primary test user not found. Will create one.");
//     return false;
//   }

//   logStep("Primary test user is found.");
//   return data?.id;
// }

// async function createPrimaryTestUser() {
//   logStep("Creating primary test user...");
//   const firstName = "Test";
//   const lastName = "Account";
//   const email = testingUserEmail;
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password: "password",
//     options: {
//       data: {
//         first_name: firstName,
//         last_name: lastName,
//       },
//     },
//   });

//   if (error) {
//     logErrorAndExit("Users", error);
//   }

//   if (data) {
//     const userId = data.user.id;
//     await supabase.from("profiles").insert({
//       id: userId,
//       first_name: firstName,
//       last_name: lastName,
//     });

//     logStep("Primary test user created successfully.");
//     return userId;
//   }
// }

async function seedInstruments(numEntries) {
  logStep("Seeding instruments...");
  const instruments = [];

  for (let i = 0; i < numEntries; i++) {
    instruments.push({
      name: faker.lorem.word(),
    });
  }
  const { data, error }
    = await supabase.from("instruments").insert(instruments).select("id");

  if (error)
    return logErrorAndExit("Instruments", error);

  logStep("Instruments seeded successfully.");

  return data;
}

async function seedDatabase(numEntriesPerTable) {
  // let userId;

  // const testUserId = await PrimaryTestUserExists();

  // if (!testUserId) {
  //   const primaryTestUserId = await createPrimaryTestUser();
  //   userId = primaryTestUserId;
  // }
  // else {
  //   userId = testUserId;
  // }

  await seedInstruments(numEntriesPerTable);
}

const numEntriesPerTable = 5;

seedDatabase(numEntriesPerTable);
