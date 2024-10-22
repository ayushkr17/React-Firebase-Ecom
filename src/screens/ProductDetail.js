import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: product.title,  
    });
  }, [navigation, product]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image || 'https://via.placeholder.com/300' }} style={styles.productImage} />

      <Text style={styles.productName}>{product.title}</Text>

      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',  
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 28,  
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetail;