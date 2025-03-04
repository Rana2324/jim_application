import Member from '../models/Member.js';

export const findAll = async () => {
  return await Member.find({}).sort({ createdAt: -1 });
};

export const findById = async (id) => {
  return await Member.findById(id);
};

export const create = async (memberData) => {
  return await Member.create(memberData);
};

export const update = async (id, memberData) => {
  return await Member.findByIdAndUpdate(id, memberData, { new: true });
};

export const remove = async (id) => {
  return await Member.findByIdAndDelete(id);
};
