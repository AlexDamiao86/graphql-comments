import { GraphQLString, GraphQLList, GraphQLInputObjectType } from 'graphql';
import CommentType from './commentType';
import { getComments, saveComment } from './commentLoader';

// Define o retorno da consulta 
export const queries = {
  getComments: {
    type: GraphQLList(CommentType), 
    resolve: getComments
  }
};

// Define os campos que serão impostados na requisição
export const mutations = {
  saveComment: { 
    type: CommentType, 
    resolve: saveComment,
    args: {
      input: { 
        type: new GraphQLInputObjectType({
        name: 'CommentInput', 
        fields: {
          name: { 
            type: GraphQLString
          }, 
          content: {
            type: GraphQLString
          }
        }
      })
      }
    }
  }
};

