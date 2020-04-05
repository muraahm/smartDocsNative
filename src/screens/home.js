import React, { useContext } from 'react';
import { Container, Content, Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { AppContext } from '../contexts/appContext/appCtx';
import { StyleSheet, View } from 'react-native';

const Home = () => {

  const { state } = useContext(AppContext);

  // const categories = state.userCategories;

  const categories = [
    { id: 1, name: 'Personal', accountant_company: 'company1' },
    { id: 2, name: 'Busnisse', accountant_company: 'company2' }
  ]
  const categoryList = categories.map(category => {

    return (

      <Button
        style={styles.category}
        key={category.id}
        id={category.id}
        categoryname={category.name}
        accountantcompany={category.accountant_company}
        onPress={() => props.viewCategory(category, category.accountant_company)}
      ><Text>{category.name}</Text></Button>

    )
  })


  return (
    <Container>
      <Content>
        {categoryList}
        <View style={styles.addCategory}>
          <Icon name="add"  style={styles.addIcon}/>
        </View>
      </Content>
      <Footer>
        <FooterTab>
          <Button active>
            <Text>Categories</Text>
          </Button>
          <Button>
            <Text>New Category</Text>
          </Button>
          <Button >
            <Text>Upload</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  category: {
    marginTop: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCategory: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  addIcon: {
    fontSize: 60
  }
});

export default Home;
