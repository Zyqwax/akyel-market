import React from 'react';
import { Center, Image, Heading, ScrollView } from 'native-base';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Layout from '../Components/Layout';
import AdminButton from '../Components/AdminButton';
import Colors from '../Colors';
import { useMyContext } from '../MyProvider';

export default function AdminMenu({ navigation }) {
  const { exportDatabase, importDatabase, clearDatabase } = useMyContext();
  return (
    <Layout title='Admin Menüsü'>
      <Center bg={Colors.main} py={4}>
        <Image
          source={{
            uri: 'https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png',
          }}
          alt='Profile Photo'
          w={24}
          h={24}
          rounded='full'
          resizeMode='cover'
        />
        <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
          Akyel Admin
        </Heading>
      </Center>

      <ScrollView showsVerticalScrollIndicator={false}>
        <AdminButton title='Ürünleri Düzenle' icon='layers' onPress={() => navigation.navigate('EditProducts')} />
        <AdminButton title='Sipariş Geçmişi' icon='pie-chart' onPress={() => navigation.navigate('OrderHistory')} />
        <AdminButton title='Veresiye Defteri' icon='edit' onPress={() => navigation.navigate('CreditBook')} />
        <AdminButton title='Ödenen Borçlar' icon='edit-3' onPress={() => navigation.navigate('PayedCredits')} />
        <AdminButton title='Müşteriler' icon='user' onPress={() => navigation.navigate('EditCustomers')} />
        <AdminButton
          title='Verileri Kopyala'
          icon='copy'
          onPress={async () => {
            await Clipboard.setStringAsync(await exportDatabase());
            Alert.alert('Panoya Kopyalandı!');
          }}
        />
        <AdminButton
          title='Verileri İçe Aktar'
          icon='download-cloud'
          onPress={async () => await importDatabase(await Clipboard.getStringAsync())}
        />
      </ScrollView>
    </Layout>
  );
}
