import mongoose, { schema } from "mongoose";

const subscriptionSchema = new schema({
  // one who is subscribing
  Subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // channel to which subscriber is subscribing
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamps: true,
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
