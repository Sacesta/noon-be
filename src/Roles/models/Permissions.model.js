const mongoose = require("mongoose");

const PermissionEnum = {
  "user.all": 1,
  "user.index": 2,
  "user.create": 3,
  "user.edit": 4,
  "user.delete": 5,

  "role.all": 10,
  "role.index": 11,
  "role.create": 12,
  "role.edit": 13,
  "role.delete": 14,

  "product.all": 20,
  "product.index": 21,
  "product.create": 22,
  "product.edit": 23,
  "product.delete": 24,

  "attribute.all": 30,
  "attribute.index": 31,
  "attribute.create": 32,
  "attribute.edit": 33,
  "attribute.delete": 34,

  "category.all": 40,
  "category.index": 41,
  "category.create": 42,
  "category.edit": 43,
  "category.delete": 44,

  "tag.all": 50,
  "tag.index": 51,
  "tag.create": 52,
  "tag.edit": 53,
  "tag.delete": 54,

  "store.all": 60,
  "store.index": 61,
  "store.create": 62,
  "store.edit": 63,
  "store.delete": 64,

  "vendor_wallet.all": 70,
  "vendor_wallet.index": 71,
  "vendor_wallet.credit": 72,
  "vendor_wallet.debit": 73,

  "commission.all": 80,
  "commission.index": 81,

  "withdraw.all": 90,
  "withdraw.index": 91,
  "withdraw.create": 92,
  "withdraw.action": 93,

  "order.all": 100,
  "order.index": 101,
  "order.create": 102,
  "order.edit": 103,

  "attachment.all": 110,
  "attachment.index": 111,
  "attachment.create": 112,
  "attachment.delete": 113,

  "blog.all": 120,
  "blog.index": 121,
  "blog.create": 122,
  "blog.edit": 123,
  "blog.delete": 124,

  "page.all": 130,
  "page.index": 131,
  "page.create": 132,
  "page.edit": 133,
  "page.delete": 134,

  "tax.all": 140,
  "tax.index": 141,
  "tax.create": 142,
  "tax.edit": 143,
  "tax.delete": 144,

  "shipping.all": 150,
  "shipping.index": 151,
  "shipping.create": 152,
  "shipping.edit": 153,
  "shipping.delete": 154,

  "coupon.all": 160,
  "coupon.index": 161,
  "coupon.create": 162,
  "coupon.edit": 163,
  "coupon.delete": 164,

  "currency.all": 170,
  "currency.index": 171,
  "currency.create": 172,
  "currency.edit": 173,
  "currency.delete": 174,

  "point.all": 180,
  "point.index": 181,
  "point.credit": 182,
  "point.debit": 183,

  "wallet.all": 190,
  "wallet.index": 191,
  "wallet.credit": 192,
  "wallet.debit": 193,

  "refund.all": 200,
  "refund.index": 201,
  "refund.create": 202,
  "refund.action": 203,

  "review.all": 210,
  "review.index": 211,
  "review.create": 212,

  "faq.all": 220,
  "faq.index": 221,
  "faq.create": 222,
  "faq.edit": 223,
  "faq.delete": 224,

  "theme.all": 230,
  "theme.index": 231,
  "theme.edit": 232,

  "theme_option.all": 240,
  "theme_option.index": 241,
  "theme_option.edit": 242,

  "setting.all": 250,
  "setting.index": 251,
  "setting.edit": 252,

  "question_and_answer.all": 260,
  "question_and_answer.index": 261,
  "question_and_answer.create": 262,
  "question_and_answer.edit": 263,
  "question_and_answer.delete": 264,
};

const permissionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: String,
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model("Permission", permissionSchema);

// const permissionList = Object.keys(PermissionEnum).map((key) => {
//   return {
//     id: PermissionEnum[key],
//     name: key,
//   };
// });

// const existingPermissions = Permission.find(
//   {
//     id: { $in: permissionList.map((p) => p.id) },
//   },
//   { id: 1 }
// ).lean();

// const newPermissions = permissionList.filter((p) => {
//   return !existingPermissions.some((ep) => ep.id === p.id);
// });

async function seedPermissions() {
  const permissionList = Object.keys(PermissionEnum).map((key) => {
    return {
      id: PermissionEnum[key],
      name: key,
    };
  });

  // Execute query
  const existing = await Permission.find(
    {
      id: { $in: permissionList.map((p) => p.id) },
    },
    { id: 1 }
  ).lean();

  const newPermissions = permissionList.filter((p) => {
    return !existing.some((ep) => ep.id === p.id);
  });

  await Permission.insertMany(newPermissions);
}

seedPermissions();

module.exports = { Permission };
