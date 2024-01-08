import User from "../models/user.js";

export const updateUser  = async(req,res)=>{
    const id = req.params.id;
    try {
        if(!id){
            return res.status(404).json("error");
        }
        const updatedUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({message:"Successfully updated user",updatedUser});
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

export const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try {
        if(!id) return res.status(500).json("error");
        await User.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const getUser = async(req,res)=>{
    const id = req.params.id;
    try {
        if(!id){
            return res.status(500).json("something went wrong");
        }
        const user = await User.findById(id);
        if(!user) return res.status(404).json("user not found");
        const {password,...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
};

// export const getAllUsers = async(req,res)=>{
//     try {
//         const users = await User.find();
//         if(!users) return res.status(404).json('no users');
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

export const getAllUsers = async(req,res)=>{
    const query = req.query.new;
    try {
       const users = query?await User.find().sort({_id:-1}).limit(5):await User.find();
       res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserStats = async(req,res)=>{
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
        try {
            const data = await User.aggregate([
              { $match: { createdAt: { $gte: lastYear } } },
              {
                $project: {
                  month: { $month: "$createdAt" },
                },
              },
              {
                $group: {
                  _id: "$month",
                  total: { $sum: 1 },
                },
              },
            ]);
            res.status(200).json(data)
          } catch (err) {
            res.status(500).json(err);
          }
}