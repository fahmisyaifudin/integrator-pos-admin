# ESCPOS Gateway

ESCPOS Gateway adalah project yang bertujuan untuk memudahkan para developer dalam menintegrasikan aplikasi miliknya agar terhubung dengan thermal printer yang support ESC/POS. Terdapat beberapa cara yang disediakan untuk menghubungkannya, diantara lain :

- Via API
- Via MQTT
- Via Wordpress Webhook

## Installation

### Installing NodeJS

ESCPOS Gateway membutuhkan nodejs untuk menjalankannya, silahkan melihat dan membaca <a href="https://nodejs.org/en/download/">dokumentasi resmi</a>, bagaimana menginstall nodejs kedalam system anda

### Clone Repository

```
$ git clone https://gitlab.com/fahmisyaifudin/mqtt-escpos-gateway.$ git escpos-gateway
```

### Install Dependencies

```
$ cd escpos-gateway
$ yarn install
```

### Setting Environment

- Buat file `.env`, copy paste credentials pada <a href="https://flamboyant-torvalds-8077b4.netlify.app/">web admin</a>, pastikan untuk login dan register terlebih dahulu
- Pada variable `SERIAL`, isikan dengan port serial yang didapatkan berdasarkan device masing masing, cek disini untuk mengetahuinya

### Running

```
$ node index.js
```

## Bagaimana Cara Menggunakan?

### Via API

Lakukan request ke API URL dengan TOKEN yang didapatkan `.env` sebelumnya
| URL | ${API_URL}/print |
| ------------- | ----------------------------------------------------------------------------- |
| Method | POST |
| Header | Content-Type: application/json <br> X-Auth-Token: ${TOKEN} |
| Body | cashier (string) <br> customer (string) <br> cash (number) <br> items (array) |
| items (array) | name (string) <br> qty (number) <br> price (number) |

### Via MQTT

Sebelum menggunakan mqtt, install <a href="https://mosquitto.org/download/">mosquitto</a> di device anda, kemudian publish message seperti contoh berikut

```
mosquitto_pub -h ${HOST} //
            -p ${PORT} //
            -u ${USER} //
            -P ${PASSWORD} //
            -t ${TOPIC} //
            -m ${MESSAGE}
```

Dengan message berisi
| Key | Value |
| ---------- | ----- |
| cashier | nama kasir (string) |
| customer | nama customer/pembeli (string) |
| cash | jumlah uang (number) |
| date | tanggal struk dibuat (YYYY-MM-DD HH:mm:ss) |
| items (array) | - <b>name</b> : nama produk/ item (string) <br> - <b>qty</b> : jumlah produk/item (number) <br> - <b>price</b> : harga produk satuan (number) |

Semua message tersebut disusun dalam json string sebelum dikirim

### Via Wordpress (Using Webhook)

Plugin <a href="https://woocommerce.com">Woocommmerce</a> yang disediakan oleh wordpress, terdapat fitur webhook yang disediakan, silahkan baca <a href="https://woocommerce.com/document/webhooks/">didokumentasi resminya </a>

- Pergi ke WooCommerce -> Settings -> Webhook
- Buat Webhook
- Pada Topic isi dengan "Order Created"
- Pada delivery URL silahkan isi dengan URL berikut
  ` ${API_URL}/hook/${TOKEN}`
- Anda dapat melihat log dari webhook pada menu Status -> Logs
