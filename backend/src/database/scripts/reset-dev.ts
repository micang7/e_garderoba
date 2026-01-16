import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource, DeepPartial } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../user/enums/user-role.enum';
import * as bcrypt from 'bcrypt';
import { Item } from '../../item/entities/item.entity';
import { ItemGender } from '../../item/enums/item-gender.enum';

async function seedDev() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ds = app.get(DataSource);
  const userRepo = ds.getRepository(User);
  const itemRepo = ds.getRepository(Item);

  for (const entity of ds.entityMetadatas) {
    const tableName = `"${entity.tableName}"`;
    await ds.query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
  }

  const hash = async (password: string) => bcrypt.hash(password, 12);

  const users: DeepPartial<User>[] = [
    {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jkowalski@example.com',
      phone: '123456789',
      role: UserRole.Admin,
      passwordHash: await hash('jkowalski'),
    },
    {
      firstName: 'Adam',
      lastName: 'Nowak',
      email: 'anowak@example.com',
      phone: '723853971',
      role: UserRole.Manager,
      passwordHash: await hash('anowak'),
    },
    {
      firstName: 'Piotr',
      lastName: 'Zieliński',
      email: 'pzielinski@example.com',
      phone: '601234567',
      role: UserRole.Manager,
      passwordHash: await hash('pzielinski'),
    },
    {
      firstName: 'Mateusz',
      lastName: 'Woźniak',
      email: 'mwozniak@example.com',
      role: UserRole.Manager,
      passwordHash: await hash('mwozniak'),
    },
    {
      firstName: 'Łukasz',
      lastName: 'Jodłowski',
      email: 'ljodlowski@example.com',
      phone: '502345678',
      role: UserRole.Dancer,
      passwordHash: await hash('ljodlowski'),
    },
    {
      firstName: 'Kamil',
      lastName: 'Lewandowski',
      email: 'klewandowski@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('klewandowski'),
    },
    {
      firstName: 'Michał',
      lastName: 'Mazur',
      email: 'mmazur@example.com',
      phone: '703456789',
      role: UserRole.Dancer,
      passwordHash: await hash('mmazur'),
    },
    {
      firstName: 'Jakub',
      lastName: 'Krawczyk',
      email: 'jkrawczyk@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('jkrawczyk'),
    },
    {
      firstName: 'Tomasz',
      lastName: 'Kaczmarek',
      email: 'tkaczmarek@example.com',
      phone: '804567890',
      role: UserRole.Dancer,
      passwordHash: await hash('tkaczmarek'),
    },
    {
      firstName: 'Bartosz',
      lastName: 'Grabowski',
      email: 'bgrabowski@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('bgrabowski'),
    },
    {
      firstName: 'Robert',
      lastName: 'Szymański',
      email: 'rszymanski@example.com',
      phone: '905678901',
      role: UserRole.Dancer,
      passwordHash: await hash('rszymanski'),
    },
    {
      firstName: 'Adrian',
      lastName: 'Dąbrowski',
      email: 'adabrowski@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('adabrowski'),
    },
    {
      firstName: 'Sebastian',
      lastName: 'Kozłowski',
      email: 'skozlowski@example.com',
      phone: '512678123',
      role: UserRole.Dancer,
      passwordHash: await hash('skozlowski'),
    },
    {
      firstName: 'Marcin',
      lastName: 'Jankowski',
      email: 'mjankowski@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('mjankowski'),
    },
    {
      firstName: 'Anna',
      lastName: 'Wiśniewska',
      email: 'awisniewska@example.com',
      phone: '603112233',
      role: UserRole.Dancer,
      passwordHash: await hash('awisniewska'),
    },
    {
      firstName: 'Katarzyna',
      lastName: 'Wójcik',
      email: 'kwojcik@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('kwojcik'),
    },
    {
      firstName: 'Maria',
      lastName: 'Kamińska',
      email: 'mkaminska@example.com',
      phone: '704223344',
      role: UserRole.Dancer,
      passwordHash: await hash('mkaminska'),
    },
    {
      firstName: 'Małgorzata',
      lastName: 'Włodarczyk',
      email: 'mwlodarczyk@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('mwlodarczyk'),
    },
    {
      firstName: 'Agnieszka',
      lastName: 'Chmielewska',
      email: 'achmielewska@example.com',
      phone: '805334455',
      role: UserRole.Dancer,
      passwordHash: await hash('achmielewska'),
    },
    {
      firstName: 'Magdalena',
      lastName: 'Borkowska',
      email: 'mborkowska@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('mborkowska'),
    },
    {
      firstName: 'Natalia',
      lastName: 'Szczepańska',
      email: 'nszczepanska@example.com',
      phone: '506445566',
      role: UserRole.Dancer,
      passwordHash: await hash('nszczepanska'),
    },
    {
      firstName: 'Zofia',
      lastName: 'Lis',
      email: 'zlis@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('zlis'),
    },
    {
      firstName: 'Karolina',
      lastName: 'Duda',
      email: 'kduda@example.com',
      phone: '607556677',
      role: UserRole.Dancer,
      passwordHash: await hash('kduda'),
    },
    {
      firstName: 'Aleksandra',
      lastName: 'Pietrzak',
      email: 'apietrzak@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('apietrzak'),
    },
  ];

  const items: DeepPartial<Item>[] = [
    {
      code: 'KRA-M-KAS-1',
      name: 'Kierezja krakowska',
      size: 'klatka: 108 cm / pas: 100 cm / dł. rękawa: 66 cm',
      gender: ItemGender.Male,
      description:
        'Długa sukmana z ciemnego sukna z charakterystycznym, bogato haftowanym kołnierzem.',
    },
    {
      code: 'KRA-D-GOR-1',
      name: 'Gorset krakowski',
      size: 'biust: 92 cm / talia: 76 cm',
      gender: ItemGender.Female,
      description:
        'Czarny, aksamitny gorset wyszywany kolorowymi nicią i cekinami, z naszytymi licznymi tasiemkami.',
    },
    {
      code: 'KRA-M-KAP-1',
      name: 'Krakuska',
      size: 'obwód głowy: 58 cm',
      gender: ItemGender.Male,
      description:
        'Czerwona czapka rogatywka obszyta czarnym barankiem, ozdobiona pawimi piórami i kolorowymi wstążkami.',
    },
    {
      code: 'KRA-D-SPA-1',
      name: 'Zapaska krakowska',
      size: 'szerokość: 80 cm / długość: 65 cm',
      gender: ItemGender.Female,
      description:
        'Biały fartuch z cienkiego płótna, wykończony misternym białym haftem i ząbkami.',
    },
    {
      code: 'ŁOW-D-SUK-1',
      name: 'Pasiak łowicki (kieca)',
      size: 'talia: 78 cm / długość: 75 cm',
      gender: ItemGender.Female,
      description:
        'Ciężka spódnica wykonana z wełny o pionowych, wielokolorowych pasach, z przewagą zieleni i pomarańczu.',
    },
    {
      code: 'ŁOW-M-SPO-1',
      name: 'Spodnie łowickie',
      size: 'pas: 90 cm / długość: 105 cm',
      gender: ItemGender.Male,
      description: 'Wełniane spodnie w podłużne pasy, w kolorze pomarańczowym.',
    },
    {
      code: 'ŁOW-D-KOS-1',
      name: 'Bielunka łowicka',
      size: 'kołnierzyk: 38 cm / biust: 110 cm',
      gender: ItemGender.Female,
      description:
        'Biała koszula z bufiastymi rękawami, ozdobiona na ramionach i mankietach barwnym haftem płaskim (róże).',
    },
    {
      code: 'POD-M-SPO-1',
      name: 'Portki góralskie',
      size: 'pas: 86 cm / biodra: 100 cm / nogawka: 78 cm',
      gender: ItemGender.Male,
      description:
        'Obcisłe spodnie z białego folowanego sukna, zdobione bogatym haftem (parzenicami) przy przyporach.',
    },
    {
      code: 'POD-M-CUC-1',
      name: 'Cucha podhalańska',
      size: 'klatka: 115 cm / długość: 80 cm',
      gender: ItemGender.Male,
      description:
        'Wierzchnie okrycie z białego sukna, zarzucane na ramiona, spięte metalową klamrą (spinką).',
    },
    {
      code: 'POD-D-KIE-1',
      name: 'Kieca podhalańska',
      size: 'talia: 74 cm / długość: 85 cm',
      gender: ItemGender.Female,
      description:
        'Spódnica najczęściej z tybetu w motywy kwiatowe (róże), u dołu podszyta szczoteczką.',
    },
    {
      code: 'POD-U-KIE-1',
      name: 'Kierpce podhalańskie',
      size: 'długość wkładki: 27 cm',
      gender: ItemGender.Unisex,
      description:
        'Skórzane obuwie wykonane z jednego kawałka skóry, wiązane rzemykami (nawłokami).',
    },
    {
      code: 'ŻYW-D-CZE-1',
      name: 'Czepek żywiecki',
      size: 'uniwersalny',
      gender: ItemGender.Female,
      description:
        'Złoty czepek mężatek, bogato haftowany metalową nicią, z tiulowym rąbkiem nad czołem.',
    },
    {
      code: 'ŻYW-D-SZA-1',
      name: 'Szal tiulowy żywiecki',
      size: '200 cm x 50 cm',
      gender: ItemGender.Female,
      description:
        'Długi, biały szal z delikatnego tiulu, pokryty ręcznym haftem o motywach roślinnych.',
    },
    {
      code: 'KUR-D-CZÓ-1',
      name: 'Czółko kurpiowskie',
      size: 'obwód: 54 cm',
      gender: ItemGender.Female,
      description:
        'Wysokie nakrycie głowy dla panien, wykonane z czarnego aksamitu, ozdobione kwiatami i wstążkami.',
    },
    {
      code: 'KUR-M-KAP-1',
      name: 'Fasownica kurpiowska',
      size: 'obwód głowy: 57 cm',
      gender: ItemGender.Male,
      description:
        'Ciemny kapelusz filcowy o cylindrycznym kształcie, przepasany czerwoną wstążką.',
    },
    {
      code: 'ŚLĄ-D-JAK-1',
      name: 'Jakla rozbarska',
      size: 'biust: 100 cm / talia: 85 cm',
      gender: ItemGender.Female,
      description:
        'Dopasowany kaftan kobiecy, sięgający bioder, z baskinką i stójką, zdobiony aplikacjami.',
    },
    {
      code: 'ŚLĄ-M-BRU-1',
      name: 'Bruclik śląski',
      size: 'klatka: 104 cm / długość: 55 cm',
      gender: ItemGender.Male,
      description:
        'Krótka, dopasowana kamizelka bez rękawów, najczęściej w kolorze niebieskim z metalowymi guzikami.',
    },
    {
      code: 'RZE-M-KOS-1',
      name: 'Koszula rzeszowska',
      size: 'kołnierzyk: 41 cm / klatka: 120 cm',
      gender: ItemGender.Male,
      description:
        'Biała lniana koszula z charakterystycznym czerwonym haftem na kołnierzu i mankietach.',
    },
    {
      code: 'RZE-D-SPA-1',
      name: 'Zapaska rzeszowska',
      size: 'szerokość: 90 cm / długość: 70 cm',
      gender: ItemGender.Female,
      description:
        'Biały fartuch z gęstym, dziurkowanym haftem rzeszowskim na dole.',
    },
    {
      code: 'KAS-D-CZE-1',
      name: 'Złotnica kaszubska',
      size: 'obwód głowy: 56 cm',
      gender: ItemGender.Female,
      description:
        'Aksamitny czepek haftowany złotymi nićmi w motywy owoców granatu i tulipanów.',
    },
    {
      code: 'KAS-M-KAM-1',
      name: 'Liwko kaszubskie',
      size: 'klatka: 106 cm / pas: 98 cm',
      gender: ItemGender.Male,
      description:
        'Długa kamizelka w kolorze ciemnogranatowym, zdobiona haftem kaszubskim.',
    },
    {
      code: 'LUB-D-KOS-1',
      name: 'Koszula krzczonowska',
      size: 'biust: 95 cm / rękaw: 62 cm',
      gender: ItemGender.Female,
      description:
        'Koszula zdobiona pasami haftu krzyżykowego i wielobarwnymi wstążeczkami na rękawach.',
    },
    {
      code: 'LUB-M-PAS-1',
      name: 'Pas skórzany lubelski',
      size: 'długość: 110 cm / szerokość: 10 cm',
      gender: ItemGender.Male,
      description:
        'Szeroki pas ze skóry, zdobiony tłoczeniami i metalowymi kółkami.',
    },
    {
      code: 'BIŁ-D-HAF-1',
      name: 'Surań biłgorajski',
      size: 'długość: 350 cm / szerokość: 45 cm',
      gender: ItemGender.Female,
      description:
        'Długi płat cienkiego płótna owijany wokół głowy, ozdobiony specyficznym spiralnym haftem (łańcuszkiem).',
    },
    {
      code: 'BIŁ-M-SPO-1',
      name: 'Gacie biłgorajskie',
      size: 'pas: 80-100 cm (wiązane) / dł. nogawki: 75 cm',
      gender: ItemGender.Male,
      description:
        'Proste spodnie z grubego lnu, białe, o luźnym kroju, wiązane w pasie sznurkiem.',
    },
    {
      code: 'CIE-D-ŻYW-1',
      name: 'Żywotek cieszyński',
      size: 'pod biustem: 80 cm / ramiączka: 35 cm',
      gender: ItemGender.Female,
      description:
        'Aksamitny, bardzo krótki gorset, bogato haftowany złotymi lub srebrnymi nićmi.',
    },
    {
      code: 'CIE-D-PAS-1',
      name: 'Trzos cieszyński',
      size: 'talia: 82 cm',
      gender: ItemGender.Female,
      description:
        'Srebrny lub pozłacany pas składający się z ogniw, zapinany na ozdobną klamrę.',
    },
    {
      code: 'SZA-M-KAFT-1',
      name: 'Kaftan szamotulski',
      size: 'klatka: 112 cm / pas: 105 cm',
      gender: ItemGender.Male,
      description:
        'Długie okrycie bez rękawów z ciemnego sukna, sięgające kolan, z rzędem guzików.',
    },
    {
      code: 'SZA-D-KRY-1',
      name: 'Kryza szamotulska',
      size: 'szyja: 38 cm',
      gender: ItemGender.Female,
      description:
        'Szeroki, sztywny kołnierz z tiulu, bogato haftowany, okalający szyję.',
    },
    {
      code: 'SIE-D-KIE-1',
      name: 'Wełniak sieradzki',
      size: 'talia: 80 cm / długość: 70 cm',
      gender: ItemGender.Female,
      description:
        'Spódnica w pionowe, wielobarwne paski, marszczona w pasie, o intensywnych kolorach.',
    },
    {
      code: 'OPO-M-LEJ-1',
      name: 'Lejbik opoczyński',
      size: 'klatka: 110 cm / długość: 60 cm',
      gender: ItemGender.Male,
      description:
        'Rodzaj kamizelki z białego sukna z ciemnymi obszyciami i kolorowym haftem na piersiach.',
    },
    {
      code: 'OPO-D-KAP-1',
      name: 'Kapelusz opoczyński',
      size: 'obwód głowy: 55 cm',
      gender: ItemGender.Female,
      description:
        'Słomkowy kapelusz zdobiony polnymi kwiatami i długimi wstążkami spływającymi na plecy.',
    },
    {
      code: 'KUB-D-GOR-1',
      name: 'Wstążkowiec kurpiowski',
      size: 'biust: 90 cm / talia: 75 cm',
      gender: ItemGender.Female,
      description:
        'Gorset zdobiony pionowymi rzędami kolorowych wstążek naszytych jedna obok drugiej.',
    },
    {
      code: 'WAR-D-CZE-1',
      name: 'Czepek warmiński',
      size: 'obwód: 56 cm',
      gender: ItemGender.Female,
      description:
        'Duży czepek o twardym denku, z bogatym złotym haftem i szerokimi bandami (wstęgami).',
    },
    {
      code: 'BAM-D-KOR-1',
      name: 'Kornet bamberski',
      size: 'wysokość: 25 cm / obwód: 54 cm',
      gender: ItemGender.Female,
      description:
        'Bardzo wysokie, ozdobne nakrycie głowy wykonane z setek sztucznych kwiatów i piór.',
    },
    {
      code: 'RAD-M-SPO-1',
      name: 'Spodnie radomskie',
      size: 'pas: 88 cm / nogawka: 80 cm',
      gender: ItemGender.Male,
      description:
        'Białe spodnie płócienne z prostymi nogawkami, wpuszczane w wysokie buty.',
    },
    {
      code: 'UNI-D-KOR-1',
      name: 'Korale prawdziwe',
      size: 'długość sznura: 45 cm',
      gender: ItemGender.Female,
      description:
        'Trzy sznury naturalnego korala o czerwonej barwie, z krzyżem lub medalionem.',
    },
    {
      code: 'UNI-M-BUT-1',
      name: 'Buty z cholewami',
      size: 'rozmiar: 43 / obwód łydki: 40 cm',
      gender: ItemGender.Male,
      description:
        'Skórzane czarne buty, tzw. "oficerki" z twardą cholewą, używane w wielu regionach.',
    },
    {
      code: 'UNI-U-PAS-1',
      name: 'Pas krakowski z brzękadłami',
      size: 'długość: 100 cm',
      gender: ItemGender.Unisex,
      description:
        'Szeroki biały pas z otworami, przez które przewleczone są kółka wydające dźwięk podczas tańca.',
    },
    {
      code: 'KRA-D-CHU-1',
      name: 'Chusta czepcowa krakowska',
      size: '80 cm x 80 cm',
      gender: ItemGender.Female,
      description:
        'Biała chusta wiązana w czepiec, zdobiona białym haftem dziurkowanym.',
    },
    {
      code: 'WIL-M-KOS-1',
      name: 'Koszula wileńska',
      size: 'kołnierzyk: 42 cm / klatka: 115 cm',
      gender: ItemGender.Male,
      description:
        'Koszula z geometrycznym, tkany wzorem (tzw. przebieranie) w kolorach czerwono-czarnych.',
    },
    {
      code: 'ŁOW-D-SPA-1',
      name: 'Zapaska naramienna łowicka',
      size: 'szerokość: 120 cm / długość: 100 cm',
      gender: ItemGender.Female,
      description:
        'Duża, pasiasta chusta wełniana zarzucana na ramiona w chłodne dni.',
    },
    {
      code: 'POD-D-GOR-1',
      name: 'Gorset tybetowy podhalański',
      size: 'biust: 88 cm / talia: 72 cm',
      gender: ItemGender.Female,
      description:
        'Gorset z cienkiej wełny (tybetu), haftowany w kolorowe kwiaty (dziewięćsiły, róże).',
    },
    {
      code: 'ŚLĄ-D-SPA-1',
      name: 'Zopaska śląska',
      size: 'szerokość: 100 cm / długość: 80 cm',
      gender: ItemGender.Female,
      description:
        'Szeroki fartuch z jedwabiu lub adamaszku, często w kolorze kremowym lub błękitnym.',
    },
    {
      code: 'KRA-M-PAS-2',
      name: 'Pas trzos krakowski',
      size: 'długość: 105 cm / szerokość: 12 cm',
      gender: ItemGender.Male,
      description:
        'Szeroki pas skórzany z kieszenią na pieniądze (trzos), zdobiony haftem i tłoczeniami.',
    },
    {
      code: 'KUR-D-FES-1',
      name: 'Fest kurpiowski',
      size: 'talia: 76 cm / długość: 70 cm',
      gender: ItemGender.Female,
      description:
        'Spódnica z ciemnego materiału, ozdobiona u dołu szerokim pasem naszytych wstążek.',
    },
    {
      code: 'LUB-M-KAP-1',
      name: 'Maciejówka lubelska',
      size: 'obwód głowy: 59 cm',
      gender: ItemGender.Male,
      description:
        'Czapka z daszkiem wykonana z granatowego sukna, popularna w stroju krzczonowskim.',
    },
    {
      code: 'RZE-D-KOS-1',
      name: 'Koszula rzeszowska kobieca',
      size: 'biust: 105 cm / kołnierzyk: 36 cm',
      gender: ItemGender.Female,
      description:
        'Koszula z białym haftem dziurkowanym na dużym, wykładanym kołnierzu.',
    },
    {
      code: 'KAS-U-BUT-1',
      name: 'Korki kaszubskie',
      size: 'rozmiar: 38',
      gender: ItemGender.Unisex,
      description:
        'Drewniane chodaki ze skórzanym wierzchem, używane do prac gospodarskich i tańców plebejskich.',
    },
    {
      code: 'CIE-D-KOS-1',
      name: 'Kabotek cieszyński',
      size: 'biust: 92 cm / długość: 35 cm',
      gender: ItemGender.Female,
      description:
        'Krótka biała koszulka sięgająca pod biust, z bufiastymi rękawami wykończonymi koronką.',
    },
    {
      code: 'SZA-M-SPO-1',
      name: 'Portki szamotulskie',
      size: 'pas: 92 cm / długość: 102 cm',
      gender: ItemGender.Male,
      description:
        'Ciemnogranatowe spodnie sukienne, noszone do wysokich butów.',
    },
  ];

  await userRepo.save(users);
  await itemRepo.save(items);

  await app.close();
}
seedDev();
