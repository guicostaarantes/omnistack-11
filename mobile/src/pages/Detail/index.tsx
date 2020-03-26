import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { incident } = route.params as any;

  function handleNavigateBack() {
    navigation.goBack();
  }

  const initialMessage = `Olá ${incident.name},
  
Estou entrando em contato pois gostaria de ajudar no caso ${
    incident.title
  } com o valor de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)}. 
  
Por favor me enviem os dados da sua organização para que eu possa ajudar e acompanhar o trabalho. Muito obrigado!`;

  function handlePhone() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.phone}&text=${initialMessage}`
    );
  }

  function handleEmail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: initialMessage
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>
        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={[styles.incidentValue, { marginBottom: 0 }]}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={handlePhone}>
            <Text style={styles.actionText}>Whatsapp</Text>
            <Feather name="phone" size={16} color={"#ffffff"}></Feather>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={handleEmail}>
            <Text style={styles.actionText}>E-mail</Text>
            <Feather name="mail" size={16} color={"#ffffff"}></Feather>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
