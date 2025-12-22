import { fakerEN_US as faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

import platforms from "../app/utils/platforms.ts";

// Config/environment variables

// eslint-disable-next-line node/no-process-env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

// eslint-disable-next-line node/no-process-env
const testingUserEmail = process.env.TESTING_USER_EMAIL;
if (!testingUserEmail) {
  console.error("Have you forgot to add TESTING_USER_EMAIL to your .env file?");
  process.exit();
}

const testingUserPassword = "password";
const testingUserFirstName = "Test";
const testingUserLastName = "Account";

const platformNames = platforms.map(platform => platform.name);

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

async function primaryTestUserExists() {
  logStep("Checking if primary test user exists...");
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username")
    .match({
      first_name: "Test",
      last_name: "Account",
    })
    .single();

  if (error) {
    console.warn("Primary test user not found. Will create one.");
    return false;
  }

  logStep("Primary test user is found.");
  return data?.id;
}

async function createPrimaryTestUser(email, password) {
  logStep("Creating primary test user...");
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error)
    return logErrorAndExit("Users", error);

  const userId = data.user.id;

  logStep("Primary test user created successfully.");
  return userId;
}

async function createPrimaryTestUserProfile(userId, email, firstName, lastName) {
  logStep("Creating profile for primary test user...");

  const { data, error } = await supabase.from("profiles").insert({
    id: userId,
    first_name: firstName,
    last_name: lastName,
    email,
  });

  if (error)
    return logErrorAndExit("Profiles", error);

  logStep("Profile for test user seeded successfully.");

  return data;
}

// Links

async function seedLinks(numEntries, userId) {
  logStep("Seeding links...");
  const links = [];

  for (let i = 0; i < numEntries; i++) {
    const url = faker.internet.url();

    links.push({
      url,
      platform: faker.helpers.arrayElement(platformNames),
      user_id: userId,
    });
  }

  const { data, error } = await supabase.from("links").insert(links).select("id");

  if (error)
    return logErrorAndExit("Links", error);

  logStep("Links seeded successfully.");

  return data;
}

// Seed database

async function seedDatabase(numEntriesPerTable) {
  // Create test user
  let testUserId = await primaryTestUserExists();
  if (!testUserId)
    testUserId = await createPrimaryTestUser(testingUserEmail, testingUserPassword);

  // Create test user profile
  await createPrimaryTestUserProfile(testUserId, testingUserEmail, testingUserFirstName, testingUserLastName);

  // const projectsIds = (await seedProjects(numEntriesPerTable, userId)).map((project) => project.id)
  await seedLinks(numEntriesPerTable, testUserId);
}

const numEntriesPerTable = 5;

seedDatabase(numEntriesPerTable);
