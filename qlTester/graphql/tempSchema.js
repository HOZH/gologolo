var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLInputObjectType = require("graphql").GraphQLInputObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
// var LogoModel = require("../models/Logo");
var UserModel = require("../models/User");

var textType = new GraphQLObjectType({
  name: "text",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      text: {
        type: GraphQLString,
      },
      color: {
        type: GraphQLString,
      },
      fontSize: {
        type: GraphQLInt,
      },
      backgroundColor: {
        type: GraphQLString,
      },
      borderColor: {
        type: GraphQLString,
      },
      borderRadius: {
        type: GraphQLInt,
      },
      borderThickness: {
        type: GraphQLInt,
      },
      margin: {
        type: GraphQLInt,
      },
      padding: {
        type: GraphQLInt,
      },
      zOrder: {
        type: GraphQLInt,
      },
      xPosition: {
        type: GraphQLInt,
      },
      yPosition: {
        type: GraphQLInt,
      },
    };
  },
});

var imageType = new GraphQLObjectType({
  name: "image",
  fields: function () {
    return {
      url: {
        type: GraphQLString,
      },
      alt: {
        type: GraphQLString,
      },
      width: {
        type: GraphQLInt,
      },
      height: {
        type: GraphQLInt,
      },
      zOrder: {
        type: GraphQLInt,
      },
      xPosition: {
        type: GraphQLInt,
      },
      yPosition: {
        type: GraphQLInt,
      },
    };
  },
});

var logoType = new GraphQLObjectType({
  name: "logo",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      texts: {
        type: new GraphQLList(textType),
      },
      images: {
        type: new GraphQLList(imageType),
      },
      width: {
        type: GraphQLInt,
      },
      height: {
        type: GraphQLInt,
      },
      lastUpdate: {
        type: GraphQLDate,
      },
    };
  },
});

var userType = new GraphQLObjectType({
  name: "user",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      username: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      firstname: {
        type: GraphQLString,
      },
      lastname: {
        type: GraphQLString,
      },
      age: {
        type: GraphQLInt,
      },
      logos: {
        type: new GraphQLList(logoType),
      },
    };
  },
});
var textInputType = new GraphQLInputObjectType({
  name: "textInput",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      text: {
        type: GraphQLString,
      },
      color: {
        type: GraphQLString,
      },
      fontSize: {
        type: GraphQLInt,
      },
      backgroundColor: {
        type: GraphQLString,
      },
      borderColor: {
        type: GraphQLString,
      },
      borderRadius: {
        type: GraphQLInt,
      },
      borderThickness: {
        type: GraphQLInt,
      },
      margin: {
        type: GraphQLInt,
      },
      padding: {
        type: GraphQLInt,
      },
      zOrder: {
        type: GraphQLInt,
      },
      xPosition: {
        type: GraphQLInt,
      },
      yPosition: {
        type: GraphQLInt,
      },
    };
  },
});

var imageInputType = new GraphQLInputObjectType({
  name: "imageInput",
  fields: function () {
    return {
      url: {
        type: GraphQLString,
      },
      alt: {
        type: GraphQLString,
      },
      width: {
        type: GraphQLInt,
      },
      height: {
        type: GraphQLInt,
      },
      zOrder: {
        type: GraphQLInt,
      },
      xPosition: {
        type: GraphQLInt,
      },
      yPosition: {
        type: GraphQLInt,
      },
    };
  },
});
var logoInputType = new GraphQLInputObjectType({
  name: "logoInput",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      texts: {
        type: new GraphQLList(textInputType),
      },
      images: {
        type: new GraphQLList(imageInputType),
      },
      width: {
        type: GraphQLInt,
      },
      height: {
        type: GraphQLInt,
      },
      lastUpdate: {
        type: GraphQLDate,
      },
    };
  },
});


var queryType = new GraphQLObjectType({
  name: "Query",

  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: function () {
          const users = UserModel.find().exec();
          if (!users) {
            throw new Error("Error");
          }
          return users;
        },
      },

      // logos: {
      //   type: new GraphQLList(logoType),
      //   resolve: function () {
      //     const logos = LogoModel.find().sort({ lastUpdate: -1 }).exec();
      //     if (!logos) {
      //       throw new Error("Error");
      //     }
      //     return logos;
      //   },
      // },
      user: {
        type: userType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const userDetails = UserModel.findById(params.id).exec();
          if (!userDetails) {
            throw new Error("Error");
          }
          return userDetails;
        },
      },
    };
  },
});

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addUser: {
        type: userType,
        args:{
       
          email: {
            type: GraphQLString,
          },
          username: {
            type: GraphQLString,
          },
          password: {
            type: GraphQLString,
          },
          firstname: {
            type: GraphQLString,
          },
          lastname: {
            type: GraphQLString,
          },
          age: {
            type: GraphQLInt,
          },
          logos:{
            type:logoInputType
          }
        
        },
        resolve: function (root, params) {
          console.log(params);
          const userModel = new UserModel(params);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error("Error");
          }
          return newUser;
        },
      },
      updateUser: {
        type: userType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: GraphQLString,
          },
          username: {
            type: GraphQLString,
          },
          password: {
            type: GraphQLString,
          },
          firstname: {
            type: GraphQLString,
          },
          lastname: {
            type: GraphQLString,
          },
          age: {
            type: GraphQLInt,
          },
          logos:{
            type: new GraphQLList(logoInputType)
          }
       
        },
        resolve(root, params) {
          console.log(params)
          return UserModel.findByIdAndUpdate(
            params.id,
            {
              email:params.email,
             username:params.username,
             passworrd:params.password,
             firstname:params.firstname,
             lastname: params.lastname,
             age: params.age
            
            },
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },
     

      addLogo: {
        type: logoType,
        args: {
          text: {
            type: new GraphQLNonNull(GraphQLString),
          },
          color: {
            type: new GraphQLNonNull(GraphQLString),
          },
          fontSize: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          backgroundColor: {
            type: new GraphQLNonNull(GraphQLString),
          },
          borderColor: {
            type: new GraphQLNonNull(GraphQLString),
          },

          borderThickness: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          borderRadius: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          margin: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          padding: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve: function (root, params) {
          // console.log(params);
          const logoModel = new LogoModel(params);
          const newLogo = logoModel.save();
          if (!newLogo) {
            throw new Error("Error");
          }
          return newLogo;
        },
      },
      updateLogo: {
        type: logoType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString),
          },
          text: {
            type: new GraphQLNonNull(GraphQLString),
          },
          color: {
            type: new GraphQLNonNull(GraphQLString),
          },
          fontSize: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          backgroundColor: {
            type: new GraphQLNonNull(GraphQLString),
          },
          borderColor: {
            type: new GraphQLNonNull(GraphQLString),
          },
          borderRadius: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          borderThickness: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          margin: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          padding: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(root, params) {
          return LogoModel.findByIdAndUpdate(
            params.id,
            {
              text: params.text,
              color: params.color,
              fontSize: params.fontSize,
              backgroundColor: params.backgroundColor,
              borderColor: params.borderColor,
              borderRadius: params.borderRadius,
              borderThickness: params.borderThickness,
              margin: params.margin,
              padding: params.padding,
              lastUpdate: new Date(),
            },
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },
      removeLogo: {
        type: logoType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
          if (!remLogo) {
            throw new Error("Error");
          }
          return remLogo;
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
