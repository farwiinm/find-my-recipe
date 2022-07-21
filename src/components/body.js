import styled from 'styled-components';

const RecipeList = styled.div`
display: flex;
flex-direction: row;
padding: 30px;
flex-wrap:wrap;
justify-content: space-evenly;
gap: 20px;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;

const RecipeContainer = styled.div`
display: flex;
flex-direction: column;
padding: 30px;
width: 300px;
box-shadow: 0 3px 10px 0 #aaa;
`;

const RecipeName = styled.div`
font-size: 18px;
font-weight: bold;
color: black;
margin: 10px 0;
`;

const Ingredients = styled.div`
font-size: 18px;
border: solid 1px green;
cursor: pointer;
padding: 10px 15px;
border-radius: 4px;
color: green;
text-align:center;
margin-bottom: 12px;
`;

const SeeMore = styled(Ingredients)`
color: red;
border: solid 1px red;
`;

export {
    Ingredients,SeeMore,RecipeContainer,RecipeList,RecipeName, CoverImage
}