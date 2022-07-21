import {SearchBox, SearchInput, Header, AppName} from './components/header';
import styled from 'styled-components';
import {Ingredients, CoverImage, SeeMore,RecipeContainer,RecipeList,RecipeName} from './components/body';
import React, { useState } from 'react';
import Axios from 'axios';
import { Dialog } from '@mui/material';
import {DialogTitle} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogActions} from '@mui/material';

const APP_ID = "41db01a4";
const APP_KEY = "62784c9823659dc2fee64686d2937d9a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Placeholder = styled.div`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;

const RecipeComponent = (props) => {
  const {image, label, url, ingredients} = props.recipe;
  const [show, setShow] = React.useState(false);

  return (
    <React.Fragment>
    <Dialog open={show}> 
    <DialogTitle id='alert-dialog-slide-title'>Ingredients</DialogTitle>
    <DialogContent>
      <table>
        <thead>
          <th>Ingredients</th>
          <th>Weight</th>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr>
              <td>{ingredient.text}</td>
              <td>{ingredient.weight}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </DialogContent>
    <DialogActions>
      <Ingredients onClick={() => window.open(url)}>See More</Ingredients>
      <SeeMore onClick={() => setShow('')}>Close</SeeMore>
    </DialogActions>
    </Dialog> 
    <RecipeContainer>
          <CoverImage src={image}/>
          <RecipeName>{label}</RecipeName>
          <Ingredients onClick={() => setShow(true)}>Ingredients</Ingredients>
          <SeeMore onClick={() => window.open(url)}>See Complete Recipe</SeeMore>
    </RecipeContainer>
    </React.Fragment>
    
  );
};

function App(){
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      updateRecipeList(response.data.hits);
  }

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      fetchRecipe(event.target.value)
    }, 1000);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          Recipe Finder
        </AppName>
        <SearchBox>
          <SearchInput
            placeholder="Search Recipe"
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>

      <RecipeList>
      {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder>Please enter a valid prompt</Placeholder>
        )}
      </RecipeList>

    </Container>
  );
}

export default App;
