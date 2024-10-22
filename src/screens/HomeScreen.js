import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { auth, db } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchProducts = () => {
    const productsRef = ref(db, '/');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setProducts(productsList);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching products: ', error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Landing');
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  };

  const navigateToProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToProductDetail(item)}>
      <View style={styles.productContainer}>
        <FastImage
          style={styles.productImage}
          source={{
            uri: item.image || 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.productName}>{item.title || 'Unnamed Product'}</Text>
        <Text style={styles.productPrice}>
          {item.price !== undefined ? `$${item.price.toFixed(2)}` : 'Price not available'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Welcome to the Store</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.productList}
          />
        ) : (
          <Text>No products available</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productList: {
    flexGrow: 1,
  },
  productContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;