import assert from "node:assert/strict";
import {
  PRODUCT_VERSION,
  advanceDay,
  completeConversation,
  confirmContext,
  createInitialState,
  createRelationship,
  deleteContext,
  getProductView,
  runDomainSelfTests,
  sendMessage,
  startConversation,
} from "../domain.mjs";

const builtIn = runDomainSelfTests();
assert.equal(builtIn.filter((result) => result.status === "fail").length, 0, JSON.stringify(builtIn, null, 2));

let state = createInitialState({ locale: "en-US", today: "2026-07-18" });
state = createRelationship(state, { name: "Alex", style: "direct" });
const sent = sendMessage(state, "I want to ship a working vertical slice this month");
assert.equal(sent.candidate.type, "goal");
state = confirmContext(sent.state, sent.candidate.id, "Ship a working vertical slice this month");
state = completeConversation(state);
assert.equal(state.relationshipEvents.length, 1);
state = advanceDay(state);
const followup = getProductView(state).followup;
assert.equal(followup.contextSnapshot, "Ship a working vertical slice this month");
state = startConversation(state, { followupId: followup.id });
assert.equal(getProductView(state).activeConversation.messages[0].source.eventId, state.relationshipEvents[0].id);
state = deleteContext(state, sent.candidate.id);
const continued = sendMessage(state, "What did I want to ship?");
assert.deepEqual(continued.response.usedContextIds, []);
assert.equal(state.version, PRODUCT_VERSION);

console.log(`Atlas v0.7.1 domain tests passed: ${builtIn.length} built-in rules plus English source/deletion scenario.`);
