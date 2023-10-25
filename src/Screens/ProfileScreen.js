import React, { useState } from "react";
import { Text, Center, Image, Heading, Box, Pressable, Spacer, HStack, ScrollView, Button } from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import Colors from "../Colors";
import { useMyContext } from "../MyProvider";
import LoginModal from "../Components/LoginModal";
import AddCustomerModal from "../Components/AddCustomerModal";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useMyContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  return (
    <Box flex={1}>
      <Center bg={Colors.main} pt={10} pb={6}>
        <Image
          source={{
            uri: user?.isAdmin
              ? "https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png"
              : "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg",
          }}
          alt="Profile Photo"
          w={24}
          h={24}
          rounded="full"
          resizeMode="cover"
        />
        <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
          {user?.name}
        </Heading>
      </Center>

      <ScrollView showsVerticalScrollIndicator={false}>
        {user?.isAdmin && (
          <>
            <Pressable
              android_ripple={{
                borderless: false,
              }}
              p={5}
              onPress={() => navigation.navigate("EditProducts")}
            >
              <HStack>
                <Feather name="shield" size={24} color={Colors.darkestGray} />
                <Text px={4}>Ürünleri Düzenle</Text>
                <Spacer />
                <AntDesign name="right" size={24} color={Colors.darkGray} />
              </HStack>
            </Pressable>
            <Pressable
              android_ripple={{
                borderless: false,
              }}
              p={5}
              onPress={() => navigation.navigate("OrderHistory")}
            >
              <HStack>
                <Feather name="pie-chart" size={24} color={Colors.darkestGray} />
                <Text px={4}>Sipariş Geçmişi</Text>
                <Spacer />
                <AntDesign name="right" size={24} color={Colors.darkGray} />
              </HStack>
            </Pressable>
            <Pressable
              android_ripple={{
                borderless: false,
              }}
              p={5}
              onPress={() => setModalVisible2(true)}
            >
              <HStack>
                <Feather name="edit" size={24} color={Colors.darkestGray} />
                <Text px={4}>Yeni Müşteri</Text>
                <Spacer />
                <AntDesign name="right" size={24} color={Colors.darkGray} />
              </HStack>
            </Pressable>
          </>
        )}
        {user && (
          <>
            <Pressable
              android_ripple={{
                borderless: false,
              }}
              p={5}
            >
              <HStack>
                <Feather name="user" size={24} color={Colors.darkestGray} />
                <Text px={4}>Profilim</Text>
                <Spacer />
                <AntDesign name="right" size={24} color={Colors.darkGray} />
              </HStack>
            </Pressable>
            <Box>
              <Button
                size="lg"
                variant="outline"
                android_ripple={{ borderless: false }}
                _text={{ color: Colors.darkestGray, fontSize: 15, fontWeight: "medium" }}
                startIcon={<Feather name="log-out" size={24} color={Colors.darkestGray} />}
                my={10}
                mx={6}
                rounded={8}
                borderWidth={2}
                _pressed={{
                  bg: 1,
                }}
                onPress={() => logout()}
              >
                Çıkış Yap
              </Button>
            </Box>
          </>
        )}
        {!user && (
          <Box>
            <Button
              size="lg"
              variant="outline"
              android_ripple={{ borderless: false }}
              _text={{ color: Colors.darkestGray, fontSize: 15, fontWeight: "medium" }}
              startIcon={<Feather name="log-in" size={24} color={Colors.darkestGray} />}
              my={10}
              mx={6}
              rounded={8}
              borderWidth={2}
              _pressed={{
                bg: 1,
              }}
              onPress={() => setModalVisible(true)}
            >
              Giriş Yap
            </Button>
          </Box>
        )}
      </ScrollView>
      <LoginModal showModal={modalVisible} setShowModal={setModalVisible} navigation={navigation} />
      <AddCustomerModal showModal={modalVisible2} setShowModal={setModalVisible2} navigation={navigation} />
    </Box>
  );
}
