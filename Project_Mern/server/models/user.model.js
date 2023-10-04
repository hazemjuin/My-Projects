const mongoose = require("mongoose");

const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name must be greater than 3 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [3, "Last name must be greater than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email must exist"],
      // validate : {
      //     validator : val => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
      //     message : "Please enter valid email"
      // },
      validate: [isEmail, "Email Not valid"],
    },
    password: {
      type: String,
      required: [true, "Password must exist"],
      minLength: [6, "Password must be 6 characters or longer"],
    },
    num_telephone: {
      type: String,
      required: [true, 'Phone number is required.'],
    },
    image: {
      type: String, // Is this right ???
      required:true,
      default:"default.png"
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    availability: {
      type: Boolean,
      default: true,
    },

    myServices: {
      type:[mongoose.Schema.Types.ObjectId],
        ref:'Service'
    }

  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword") // Bringing Confirm password
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  // Comparing Password & ConfirmPassword
  // console.log("Inside Validate confirm password");
  // console.log(`Password : ${this.password}\nConfirm Password :${this.confirmPassword}`);
  if (this.password != this.confirmPassword) {
    this.invalidate(
      "confirmPassword",
      "Password and Confirm Password dont Match !"
    );
  }
  next();
});

UserSchema.pre("save", async function (next) {
  // console.log("Inside Pre Save Hook:");
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    // console.log(`Password Text : ${this.password}\nHashed Password : -----${hashedPassword}-----`);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
