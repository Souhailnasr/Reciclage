import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../models/User';
import { AuthService } from '../../services/auth';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    try {
      setLoading(true);
      const response = await AuthService.signup({
        email,
        password,
        firstName,
        lastName,
        role: UserRole.USER
      });
      await login(response.user, response.token);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/recycle-logo.png')} style={styles.logo} />
          <Text style={styles.title}>Créer un compte</Text>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            placeholderTextColor="#b0c4b1"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#b0c4b1"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#b0c4b1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#b0c4b1"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Création...' : 'Créer un compte'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: '#fff',
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#185a9d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  button: {
    width: '100%',
    backgroundColor: '#185a9d',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linkButton: {
    marginTop: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    opacity: 0.9,
  },
}); 