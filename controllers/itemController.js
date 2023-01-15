import Item from "../models/itemModel.js";

export const userItems = async (id) => {
  try {
    const results = await Item.find({ user: id }).sort({ createdAt: -1 });
    return {
      status: true,
      message: "Items fecthed succesfully",
      data: results,
    };
  } catch (error) {
    return { status: false, message: "Items fecthed failed", data: error };
  }
};


export const saveItem = async (payload, id) => {
  const newItem = new Item({
    name: payload.name,
    description: payload.description,
    user: id,
  });
  try {
    const item = await newItem.save();
    return { status: true, message: "Item saved succesfully", data: item };
  } catch (error) {
    return { status: false, message: "Item did not save successfully", data: error };
  }
};


export const updateItem = async (payload, id) => {
   
    try {
        const item = await Item.findById(id);
      if(item) {
        item.name = payload.name
        item.description = payload.description
        item.user = item.user

        const updatedItem = await item.save();
        return { status: true, message: "Item updated succesfully", data: updatedItem };
      }else{
        return { status: false, message: "Item was not found", data: null };
      }
     
    } catch (error) {
      return { status: false, message: "Item did not update successfully", data: error };
    }
  };


  export const deleteItem = async (id) => {
   
    try {
        await Item.deleteOne({_id: id});
        return { status: true, message: "Item deleted succesfully", data: null };
      }
      catch (error) {
      return { status: false, message: "Item did not delete", data: error };
    }
  };
