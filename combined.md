# সিস্টেম ডিজাইন বাংলা

এটি একটি রিপোজিটরি যেখানে সিস্টেম ডিজাইন এর মৌলিক জিনিসগুলো নিয়ে আলোচনা করা হয়েছে।

এই টিউটোরিয়াল এর উদ্দেশ্য আপনাকে মৌলিক জিনিসগুলোর ধারণা দেয়া। ভালো লাগলে star, watch কিংবা fork ক্লিক করে রাখতে পারেন।

<p align="center">
  <img src="./images/system-design-wallpaper.png" alt="System Design Wallpaper">
</p>

### সূচিপত্র

- [Section 1: System Design](#section-1-system-design)
- [Section 2: Database Engineering](#section-2-database-engineering)
- [Section 3: Database Transaction](#section-3-database-transaction)
- [Section 4: Client Server Architecture](#section-4-client-server-architecture)
- [Section 5: Reliability](#section-5-reliability)
- [Section 6: Performance Metrics](#section-6-performance-metrics)
- [Section 7: Distributed System](#section-7-distributed-system)
- [Section 8: Domain Name System](#section-8-domain-name-system)
- [Section 9: Transmission Control Protocol](#section-9-transmission-control-protocol)
- [Section 10: User Datagram Protocol](#section-10-user-datagram-protocol)
- [Section 11: HTTP, TLS and HTTPS](#section-11-http-tls-and-https)
- [Section 12: What happens when you type a URL in your browser](#section-12-what-happens-when-you-type-a-url-in-your-browser)
- [Section 13: Concurrency and Parallelism](#section-13-concurrency-and-parallelism)
- [Section 14: High Concurrency Control](#section-14-high-concurrency-control)
- [Section 15: Functional and Non Functional Requirements](#section-15-functional-and-non-functional-requirements)
- [Section 16: Back Of the Envelope Estimation](#section-16-back-of-the-envelope-estimation)
- [Section 17: Authentication and Authorization](#section-17-authentication-and-authorization)
- [Section 18: Stateful and Stateless Architecture](#section-18-stateful-and-stateless-architecture)
- [Section 19: Proxy](#section-19-proxy)
- [Section 20: REST API](#section-20-rest-api)
- [Section 21: Scalability](#section-21-scalability)
- [Section 22: Database Sharding](#section-22-database-sharding)
- [Section 23: Database Replication](#section-23-database-replication)
- [Section 24: Caching](#section-24-caching)
- [Section 25: Content Delivery Network](#section-25-content-delivery-network)
- [Section 26: Rate Limiter](#section-26-rate-limiter)
- [Section 27: CAP Theorem](#section-27-cap-theorem)
- [Section 28: Consistent Hashing] (চলমান)
- [Section 29: Polling, Web Socket and Server-Sent Events](#section-29-polling-web-socket-and-server-sent-events)
- [Section 30: Stream and Batch Processing] (চলমান)
- [Section 31: Message Queue](#section-31-message-queue)
- [Section 32: rpc, gRpc] (চলমান)
- [Section 33: Single Sign-On](#section-33-single-sign-on)
- [Section 34: Elasticsearch](#section-34-elasticsearch)
- [Section 35: Bloom Filter](#section-35-bloom-filter)
- [Section 36: Load Balancing Algorithms] (চলমান)
- [Section 37: How Live Streaming works] (চলমান)
- [Section 38: How OAuth2 works](#section-38-how-oauth2-works)
- [Section 39: Serverless Architecture] (চলমান)
- [Section 40: High Availability best practices by Netflix](#section-40-high-availability-best-practices-by-netflix)
- [Section 41: Real World Problems](#section-41-real-world-problems)
- [Section 42: Resources](#section-42-resources)

## Section 1: System Design

যখন আমরা একটি অ্যাপ্লিকেশন ডেভেলপ করি, তখন একটি নির্দিষ্ট ডিজাইন অনুসরণ করা জরুরি। এর প্রধান কারণ হলো, অ্যাপ্লিকেশনটি যাতে বর্তমানে এবং ভবিষ্যতে কোনও সমস্যা ছাড়াই ভালভাবে কাজ করতে পারে। বিশেষ করে, যদি অ্যাপ্লিকেশনটি এক সময় প্রচুর ব্যবহারকারী পেয়ে থাকে, তখন এটি প্রচুর লোড সহ্য করতে সক্ষম হতে হবে এবং কোনো কানেকশন বিচ্ছিন্নতা বা পারফরম্যান্সের অবনতি ছাড়াই কাজ করতে হবে। এই ধরনের ডিজাইনকেই সিস্টেম ডিজাইন বলা হয়।

(এই স্পেসিফিক সিস্টেম ডিজাইন মূলত ব্যাকএন্ড ইঞ্জিনিয়ারিং এর সাথে সম্পৃক্ত।)

## Section 2: Database Engineering

সিস্টেম ডিজাইন করার সময় ডেটাবেস খুবই গুরুত্বপূর্ণ বিষয়। কোন কোন রকমের এপ্লিকেশন এর জন্য কোন কোন রকমের ডেটাবেস ব্যবহার করবেন, ডেটাবেসের টেবিলের স্ট্রাকচার কেমন, টেবিল কলাম এর ডেটা টাইপ, টেবিল size ইত্যাদি জানা আমাদের দরকার।

এপ্লিকেশন ডেভেলপ করার সময় আমাদের কাজ অনুযায়ী ডেটাবেস নির্বাচন করতে হয়। সাধারণত, আমরা প্রধান দুই ধরনের ডেটাবেস ব্যাবহার করে থাকি - SQL(রিলেশনাল) ডেটাবেস এবং NoSQL(নন-রিলেশনাল) ডেটাবেস। আমরা কেমন বা কোন ধরণের ডাটা ষ্টোর করতে চাই, কিভাবে ষ্টোর করতে চাই, আমাদের কাজের পদ্ধতি ইত্যাদি প্রয়োজন অনুযায়ী ডেটাবেস বাছাই করতে হয়। ডাটার ধরন অনুযায়ী ডেটাবেসগুলো আমাদের ভিন্ন ভিন্ন সুবিধা দিয়ে থাকে।

| SQL                                                                                                                                                   | NoSQL                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| টেবিলের মধ্যে ডাটা স্টোর করা হয়, যেখানে প্রতিটি সারি একটি এন্টিটি এবং প্রতিটি কলাম একটি ডাটার বৈশিষ্ট্য নিদের্শন করে। টেবিলগুলোর মধ্যে relation থাকে। | কোন প্রকার relation ছাড়া ডাটা বিভিন্নভাবে ষ্টোর করে থাকে। যেমনঃ key-value, graph, document ইত্যাদি। |
| নির্দিষ্ট স্কিমা অনুযায়ী ডাটা স্টোর করা হয়। (ডাটাবেস পরিবর্তনের মাধ্যমে স্কিমা পরবর্তীতে পরিবর্তন করা যায়।)                                           | NoSQL ডাটাবেসে ডাইনামিক স্কিমা থাকে, অর্থাৎ স্কিমা পরিবর্তনযোগ্য।                                   |

🔗 **আরও পড়ুন: ডেটাবেস**
## কখন SQL কিংবা NoSQL ব্যবহার করব?

কোন প্রকারের ডাটাবেস নির্বাচন করব সেজন্য আমাদের সিস্টেম নিয়ে নিচের বিষয়গুলোর উত্তর জানা দরকার,

- ডাটাবেস দিয়ে প্রয়োজনীয় Query চালাতে পারবো কি না?
- ডাটাবেসের Table কি প্রয়োজনীয় সংখ্যক ডাটা store করে রাখতে পারবে কি না?
- কয়টি নোড থাকতে পারবে?
- Maintenance কি রকম হবে, মানে schema বদলাবে কি না?

এখন SQL এবং NoSQL এর কিছু বৈশিষ্ট্য আছে যা আমাদের সাহায্য করবে কোন ডাটাবেস নির্বাচন করব,

- Predetermined Schema: SQL দিয়ে আমরা কোনো operation (read, insert, update, delete) চালানোর আগে আমাদের টেবিলের schema Predetermined থাকতে হবে। টেবিলের schema Predetermined বলতে বুঝানো হচ্ছে একটি টেবিল যেমন user table এখানে schema হবে,

  - id
  - name
  - email
  - password
  - (ইত্যাদি)

এইগুলো Predetermined মানে পূর্বনির্ধারিত থাকলে, আমরা SQL ভিত্তিক RDBMS Database যেমন MySQL, PostgreSQL ইত্যাদি ব্যবহার করতে পারব।

অপরপক্ষে schema যদি Predetermined না থাকে তাহলে NoSQL ব্যবহার করা যায়। NoSQL এর ডেটা সাধারণত key-value, Document, Graph আকারে ডিস্কে স্টোর হয়ে থাকে, সেজন্য schema ফিক্সড হওয়া লাগে না।

- Scalability: ডেটা অনেক বেশি হয়ে গেলে SQL ভিত্তিক Database গুলোতে ভার্টিকাল স্কেলিং করা হয় মানে storage এর capacity বৃদ্ধি করা। (তাছাড়া Database Sharding-ও করা হয়ে থাকে)

আর NoSQL ভিত্তিক হরাইজন্টাল স্কেলিং করা হয় মানে সার্ভারের Capacity বৃদ্ধি করার পরিবর্তে নতুন সার্ভার যোগ করাই হল হরাইজন্টাল স্কেলিং।

এখন আমাদের সিস্টেম এ কোন রকমের scaling করলে আমাদের system চালাতে পারব তার উপর ভিত্তি করে সিদ্ধান্ত নিব।

- ACID: SQL ভিত্তিক Database সাধারণত ACID property follow করে থাকে। যেখানে A মানে Atomicity, C মানে Consistency, I মানে Isolation এবং D মানে Durability। এগুলোর উদ্দেশ্য হল Data Integrity এবং Consistency বজায় রাখা। যেমন Banking Software/ATM Vendor Machine এগুলোর জন্য ACID খুব গুরুত্বপূর্ণ।

ACID খুবই গুরুত্বপূর্ণ বিষয়। ACID বুঝতে হলে আমাদেরকে **Transaction** বুঝতে হবে।

**Transaction বুঝতে হলে Section-3 দেখতে পারেন**

NoSQL ভিত্তিক Database, BASE মানে (Basically Available, Soft state, Eventual consistency) সাপোর্ট করে।

এখন আমাদের সিস্টেমে Data Integrity/Consistency(Strong Consistency) বজায় রাখতে চাইলে আমরা **SQL ভিত্তিক Database ব্যবহার করব**, না হয় **NoSQL ভিত্তিক Database**।

## Database Performance

Database Performance সিস্টেম ডিজাইনে খুবই গুরুত্বপূর্ণ বিষয়।

### Database Indexing

Database Indexing একটি সাধারণ টেকনিক যা আমাদের Database Query কে দ্রুত সম্পন্ন করে থাকে।

সাধারণত ডেটা Disk-এ সংরক্ষন হয়ে থাকে। যখন ডেটা বেড়ে যায় তখন সেই ডেটাগুলো থেকে Query করতে অনেক সময় লাগে, এই সময় কমানোর জন্য আরেকটি টেবিল Disk-এ তৈরী হয় যাকে Index Table বলে। এই Index Table-এ মূলত আমাদের মূল টেবিল এর row(s) এর সাথে একটি লিংক করা থাকে, সেটি key-value আকারেও থাকতে পারে। যখন নতুন row কিংবা entry ডেটাবেস টেবিলে insert হয়, Index Table-এ সেই নতুন ডেটার সাথে একটি লিংক তৈরী হয় (সেজন্য আমাদের write operation slow হয়ে যেতে পারে আর read operation fast হয়)।

পরবর্তী সময়ে যখন কেউ নির্দিষ্ট ডেটা query করবে, তখন Index Table বলে দিবে কোন এড্ড্রেসে বা কোন ব্লকে ডেটা আছে।

বিস্তারিত জানতে চাইলে আমার ব্লগ দেখতে পারেন,

- https://codemacaw.com/database-indexing-makes-db-query-faster/
- https://codemacaw.com/what-is-b-tree-b-tree-in-dbms/

#### আমরা কি সব কলামে INDEX যোগ করে দিবো?

উত্তর হলো, না। আমরা কার্ডিনালিটির (Cardinality) উপর গুরুত্ব দিব। কার্ডিনালিটি সাধারণত কোনো নির্দিষ্ট কলামে ডেটার মানের অনন্যতা (uniqueness) নির্দেশ করে।

উদাহরণস্বরূপ, একটি অর্ডার (orders) টেবিল বিবেচনা করুন, যার নিম্নলিখিত attribute রয়েছে:

- id

- customer_id

- status

এখানে,

- id এবং customer_id এর কার্ডিনালিটি বেশি (high cardinality) কারণ এগুলো unique। টেবিলের আকার যত বড় হবে, এই কলামগুলোর মান তত বেশি অনন্য হবে, ফলে কার্ডিনালিটিও বাড়বে।

- status এর কার্ডিনালিটি কম (low cardinality) কারণ এর মান সীমিত, যেমন: "pending", "processing", বা "delivered"। অর্থাৎ, একাধিক সারিতে একই মান থাকতে পারে।

ইন্ডেক্সিং এবং কার্ডিনালিটি:

উচ্চ কার্ডিনালিটির (high cardinality) কলামে ইন্ডেক্সিং করলে:

- টেবিল স্ক্যান (table scan) কম হয়।

- unique মান খোঁজা দ্রুত হয় (যেমন, customer_id)।

নিম্ন কার্ডিনালিটির (low cardinality) কলামে ইন্ডেক্সিং করলে:

- টেবিল স্ক্যান (table scan) বেশি হয়।

- কারণ কলামের মান unique নয়, যা কার্যকারিতা (efficiency) কমিয়ে দেয়।

### Query Optimization

Query লিখার সময় আমরা Query Optimize ভাবে লিখলে আমরা Query Execution Time কমাতে পারবো। কিছু উদাহরণ,

- নির্দিষ্ট ফিল্ড (যেমন, SELECT name, username FROM users) সিলেক্ট করা SELECT \* এর পরিবর্তে।
- SELECT DISTINCT সম্ভব হলে avoid করা।
- WHERE ব্যবহার করা HAVING এর পরিবর্তে।
- LIMIT ব্যবহার করা।
- INNER JOIN ব্যবহার করা।
- Number of Sub-queries কমানো।
- Complex Query এর জন্য Stored Procedure ব্যবহার করা। এতে করে আমরা Network Traffic কমাতে পারি।
- WHERE clause এর ভিতর Scaler Function ব্যবহার না করা। WHERE clause এর ভিতর Scaler Function ব্যবহার করলে Query Optimizer, Index কে ব্যবহার করতে পারে না।
- Normalize অথবা Denormalize অনুযায়ী Schema Design করা।
- n+1 query execute না করা।

### id কি auto-increment না UUID/ULID হিসেবে ব্যবহার করবো?

System Design করার সময় আমাদের এই ব্যপারে সিদ্ধান্ত নিতে হয়, আমাদের টেবিল এর id (primary key) কে কি auto-increment রাখবো না কি random string মানে UUID/ULID রাখবো।

নির্ভর করে।

- auto-increment অনুমানযোগ্য। UUID/ULID অনুমানযোগ্য নয়।

- auto-increment এর সাইজ ৪ বাইট (৩২-বিট ইন্টিজার) বা ৮ বাইট (৬৪-বিট ইন্টিজার)। UUID/ULID এর সাইজ ১৬ বাইট।

এগুলো দুইটি প্রধান বিবেচ্য বিষয়। আপনি যেকোনো একটিকে বেছে নিতে পারেন বা হাইব্রিড পদ্ধতিও ব্যবহার করতে পারেন।

তবে পারফরম্যান্সের দিক থেকে ULID, UUID এর তুলনায় ভালো কাজ করে। কারণ ULID-এ ৪৮-বিট timestamp এবং ৮০-বিট random ভ্যালু থাকে, তাই এর প্রথম অংশ টাইমস্ট্যাম্প হওয়ায় এটি লেক্সিকোগ্রাফিকভাবে (lexicographically) সাজানো যায়।

এই সাজানো প্রকৃতি ULID-কে B+ Tree ডাটা স্ট্রাকচারের সাথে ইন্ডেক্সিং, খোঁজা (finding), ইনসার্ট (insertion) ও ডিলিট (deletion) অপারেশনে আরও কার্যকরী করে।

অন্যদিকে, UUID v4 সম্পূর্ণ random হওয়ায় এটি B+ Tree ইন্ডেক্সিংয়ে বেশি ফ্র্যাগমেন্টেশন তৈরি করে এবং reebalancing প্রয়োজন হয়, যা পারফরম্যান্স কমিয়ে দেয়। তাই ULID অনেক ক্ষেত্রে UUID-এর তুলনায় দ্রুততর হয়।

### Database Sharding

Database Sharding হল টেবিল থেকে ডেটা পৃথক করা। উদাহরণ বলা যায়, ডাটাবেসের ডেটা/row যদি বাড়তে থাকে এবং এত পরিমাণ ডেটা/row বেড়ে গেল যার ফলে ডাটাবেস টেবিলে আর স্টোর করা যায় না তখন আমরা ডেটাগুলোকে মূল টেবিল থেকে পৃথক করে অন্যান্য shard টেবিলে distribute করে রাখি সেটাই Database Sharding। একাধিক সার্ভার এই ডিস্ট্রিবিউশন হবে।

<p align="center">
  <img src="./images/sharding.png" alt="Sharding">
</p>

### Connection Pool

সাধারণত ডেটাবেসে কোনো ক্লায়েন্ট যখন রিকোয়েস্ট করে তখন তার জন্য একটি dedicated tcp connection তৈরী হয়ে থাকে, যখন ক্লায়েন্ট এর কাজ শেষ হয়ে যাবে তখন tcp connection শেষ হয়ে যাবে। ।

<p align="center">
  <img src="sections/database/images/db-1.png" alt="database">
</p>

এরকম প্রতিটি ক্লায়েন্ট এর ক্ষেত্রে নতুন connection তৈরী হয়। এখন হাজার হাজার ক্লায়েন্ট ডেটাবেসে connection তৈরী করার চেষ্টা করে তখন Latency বৃদ্ধি পায়। এটি এড়াতে Connection Pool ব্যবহার করা হয়।

এটি একটি pool যেখানে একাধিক connection open হয়ে থাকবে, যখন কোনো ক্লায়েন্ট রিকোয়েস্ট আসবে তখন একটি connection সেই ক্লায়েন্ট ব্যবহার করতে পারবে। এতে করে বার বার connection তৈরী হওয়া এবং নষ্ট হওয়া থেকে এড়াতে পারব। আমরা specifically বলে দিতে পারব কয়টি connection, pool এর ভিতর থাকবে। ক্লায়েন্ট রিকোয়েস্ট pool এর connection এর চেয়ে বেশি হয়ে গেলে client কে wait করা লাগবে।

<p align="center">
  <img src="sections/database/images/db-2.png" alt="database">
</p>

Connection Pool এর size randomly সেট করা যাবে না। Concurrent Users এর সংখ্যা নিয়ে চিন্তা করতে হবে। উদাহরণস্বরূপ, যদি আপনার অ্যাপ্লিকেশনে ২০০০ concurrent users থাকে, তবে সব ২০০০ ব্যবহারকারী একসঙ্গে ডেটাবেসে আঘাত করবে না। তাই কত শতাংশ ব্যবহারকারী একযোগে ডেটাবেস request করবে তা estimate করুন এবং সেই অনুযায়ী Connection Pool এর size নির্ধারণ করুন।

কিভাবে PostgreSQL এ Connection Pool ডিফাইন করবেন,

```js
const { Pool } = require("pg");

const pool = new Pool({
  user: "your_user",
  host: "localhost",
  database: "your_db",
  password: "your_password",
  port: 5432,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Timeout if connection takes too long
});

// Usage
async function queryDatabase() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users");
    console.log(result.rows);
  } finally {
    client.release(); // Return client to the pool
  }
}

queryDatabase();
```

কিভাবে MySQL এ Connection Pool ডিফাইন করবেন,

```js
const mysql = require("mysql2");

// Create a pool of connections
const pool = mysql.createPool({
  host: "localhost",
  user: "your_user",
  password: "your_password",
  database: "your_db",
  waitForConnections: true, // Allow waiting for available connection
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited queued connections
});

// Query the database
pool
  .execute("SELECT * FROM users")
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch((err) => {
    console.error(err);
  });
```

আপনি চাইলে MySQL কনফিগারেশন ফাইলে Connection Pool সেটআপ করতে পারবেন,

আপনি লিনাক্স ব্যবহার করলে, `/etc/mysql/my.cnf`

```
[mysqld]
max_connections = 200       # Maximum number of connections allowed
wait_timeout = 600           # Timeout for waiting for client data
interactive_timeout = 600    # Timeout for interactive connections
```

### Buffer Pool (InnoDB অনুসারে)

এটি মূল মেমোরি বা RAM এর ভিতরের একটি এলাকা, যেখানে InnoDB (MySQL ইঞ্জিন) টেবিল এবং ইনডেক্স ডেটা ক্যাশ করে রাখে যখন তা access করা হয়। ডেটা সরাসরি বাফার পুল থেকে অ্যাক্সেস করার মাধ্যমে আমরা query processing এর সময়কে দ্রুততর করতে পারি।

Buffer Pool বিভিন্ন pages এর সমন্বয়ে গঠিত, এবং প্রতিটি page-এ ডেটার সারি (rows of data) থাকে। এটি মূলত লিংকড লিস্ট ডেটা স্ট্রাকচার অনুযায়ী সাজানো থাকে।

সাধারণত ডিস্ক থেকে ডাটা fetch করে আনা, সময় সাপেক্ষ ব্যাপার। এক্ষেত্রে Buffer Pool অনেক উপকারী।

ডেটার জন্য ডিস্ক এর মধ্যে সার্চ করার পরিবর্তে, বাফার পুল থেকে সার্চ করে ডাটা নেয়া হয়। যদি বাফার পুল এর মধ্যে ডাটা না পাওয়া যায় তাহলে disk এর ভিতর সার্চ করে ডাটা নেয়া হবে, তারপর ডাটাকে বাফার পুলের ভিতর cache করে রেখে দেয়া হয়।

InnoDB ডাটাবেস ইঞ্জিন এর Default buffer pool এর size হচ্ছে ১২৮ এমবি, যা মূলত ডেভেলপমেন্ট environment এর জন্য, প্রোডাকশন environment এর জন্য এর size নির্ভর করে কিছু বিষয়ের উপর।

বাফার পুলের size, innodb_buffer_pool_chunk_size \* innodb_buffer_pool_instances এর হয় সমান থাকবে কিংবা multiple থাকবে।

- innodb_buffer_pool_chunk_size: এটি মূলত বাফার পুলের chunk size কত তা বলে দেয়। MySQL এর InnoDB storage engine এর ভিতর বাফার পুল chunk হিসেবে ভাগ করা থাকে। প্রতিটি chunk একটি নির্দিষ্ট মেমোরি সাইজ দ্বারা নির্ধারিত হয়, যা innodb_buffer_pool_chunk_size দ্বারা configure করা হয়।

```sql
SHOW VARIABLES LIKE 'innodb_buffer_pool_chunk_size';
```

উপরের SQL command দ্বারা আমরা জানতে পারবো, বাফার পুল কয়টি chunk এ ভাগ করা হয়েছে।

- innodb_buffer_pool_instances: এটি দ্বারা বুঝা যায়, প্রতিটা বাফার পুলকে কয়টি instance এ ভাগ করা হয়েছে।

```sql
SHOW VARIABLES LIKE 'innodb_buffer_pool_instances';
```

উপরের SQL command দ্বারা আমরা জানতে পারবো, প্রতিটা বাফার পুলকে কয়টি instance এ ভাগ করা হয়েছে।

মনে করি,

- innodb_buffer_pool_chunk_size = 128MB
- innodb_buffer_pool_instances = 4

তাহলে innodb_buffer_pool_size হতে পারে,

- 128MB × 4 = 512MB
- 128MB × 4 × 2 = 1024MB = 1GB

আমরা যেকোন একটি নির্বাচন করতে পারি। তবে আমাদের সিস্টেমের RAM এর প্রতি খেয়াল রাখতে হবে।

ধরে নি, innodb_buffer_pool_size = ১ GB

RAM যদি ৮ GB হয়?

তাহলে ১ GB মানে, ১২.৫% শুধু বাফার পুলের জন্য বাকি ৮৭.৫% অন্যান্য প্রসেসিং এর জন্য বরাদ্ধ করা হয়, যা সাধারণত acceptable।

RAM যদি ৪ GB হয়?

তাহলে ১ GB মানে, ২৫% শুধু বাফার পুলের জন্য বাকি ৭৫% অন্যান্য প্রসেসিং এর জন্য বরাদ্ধ করা হয়, যা সাধারণত acceptable।

যেসব জিনিসগুলো মনে রাখতে হবে,

- বাফার পুল এর size নির্বাচন করার পূর্বে দেখতে হবে আমাদের সিস্টেম read-heavy নাকি write-heavy।

- বাফার পুল এর size বেশি বড় হয়ে গেলে, সার্ভার swapping করা শুরু করতে পারে। যার মানে অপারেটিং সিস্টেম ডিস্ক কে ভার্চুয়াল মেমরি হিসেবে বিবেচনা করবে। যা performance নামিয়ে দিতে পারে।

### Hardware এবং Infrastructure

আমাদের ডাটাবেস এর পারফরমেন্স ভালো করতে পারে সেজন্য আমাদের requirements অনুযায়ী Hardware এবং Infrastructure নেয়া।

## Write/Update অপারেশন এর জন্য Performance Optimization

- অপ্রোজনীয় কলাম ইনডেক্সিং না করা। কারণ যখন নতুন row ইন্সার্ট হবে তবে ইনডেক্স টেবিলেও রেফারেন্স ইন্সার্ট হবে যা write অপারেশন slow করে দিতে পারে।
- Requirements অনুযায়ী Hardware নির্বাচন করা।
- innodb_buffer_pool_size সেট করা। কারণ প্রতিটি write অপারেশন সরাসরি ডিস্ক এ গিয়ে স্টোর হয় না, বরং বাফার পুল এর ভিতর অবস্থান করে প্রথমে। তাই বাফার পুলের size enough থাকলে write অপারেশন fast হবে।

## Read query, indexing ছাড়া কিভাবে execute হয়?

<p align="center">
  <img src="sections/database/images/read-query-execution.png" alt="Read Query Execution">
</p>

ছবিটি বিশ্লেষণ করলে,

- User একটি GET query রিকুয়েস্ট করলো। শর্ত username="lahin"।
- Page Filtering নামক অংশটি প্রথমে Buffer Pool এর ভিতর খুঁজবে username=lahin সম্বলিত page আছে কি না। যদি থাকে তাহলে, সেই page থেকে row কে filter করে user এর কাছে পাঠিয়ে দিবে। অন্যথায় Disk এর pages এর মধ্য one-by-one করে I/O request চালাবে।
- যখন username=lahin সম্বলিত row পেয়ে যাবে তখন তা সম্পূর্ণ page কে Buffer Pool এ Cache করে রেখে দিবে।
- তারপর সেই page থেকে ফিল্টার হয়ে নির্দিষ্ট row; user এর রিটার্ন করবে।

[ইউটুবে দেখুন](https://youtu.be/fY-LGFSIkBw?si=f-R-W77xkFjxQ9_A)

## প্রোডাকশন environment এর মধ্যে কিভাবে ডাটাবেস error গুলো log করবো?

প্রোডাকশন environment এ যেকোনো সময় যেকোনো error চলে আসতে পারে। আমাদের সিস্টেম সচল রাখার জন্য এসব error এর লগ পড়ে বুঝতে হবে তারপর সমাধান(fix) করতে হবে। যত তাড়াতাড়ি আমরা সেই error গুলো পড়ে fix করতে পারবো, তা আমাদের সিস্টেমের জন্য ভালো।

ধরে নি, আমরা লিনাক্স(ubuntu) এর মধ্যে MySQL ব্যবহার করছি।

### Error Log

Linux এর ভিতর আমরা cd করলে,

```
ubuntu@ip-192-168-0-1:/$ cd /var/log/mysql
```

mysql ফোল্ডার এর ভিতর **error.log** নামক ফাইল থাকে। এই ফাইল cat করলে আমরা দেখতে পারবো,

- Server Startup ভিত্তিক Errors: MySQL যখন start হয় তখন এরকম কিছু error আসতে পারে,

```
[ERROR] Can't start server: Bind on TCP/IP port: Address already in use
```

এর মানে দাঁড়ায়, MySQL bind করতে পারছে না তার পোর্ট দিয়ে (সাধারণত ৩৩০৬)। সেই পোর্ট ইতিমধ্যে অন্য প্রসেস দ্বারা প্রসেস হচ্ছে।

কিংবা,

```
[ERROR] Fatal error: Can't open and lock privilege tables: Table 'mysql.user' doesn't exist
```

MySQL যখন তার privilege tables এক্সেস করতে না পারে তখন এই error আসে।

- Authentication এবং Access ভিত্তিক Errors: ভুল username কিংবা password কিংবা missing privileges ভিত্তিক এররগুলো দেখাবে।

```
[Warning] Access denied for user 'root'@'localhost' (using password: YES)
```

- Storage Engine ভিত্তিক Errors: Disk Failure, Power Outage কিংবা Forced Shutdown যা টেবিলকে corrupted করে ফেলে। আমরা এরকম এরর দেখতে পারি,

```
[ERROR] InnoDB: Page [page id] log sequence number [LSN] is in the future!
[ERROR] InnoDB: Database page corruption on disk or a failed file read
[ERROR] InnoDB: Table `mydb/mytable` is corrupted
[ERROR] InnoDB: Unable to read tablespace [file.ibd]
```

- Crash এবং Critical Errors: টেবিল corrupted থাকার কারণে কিংবা Disk full থাকার কারণে MySQL version এ বাগ থাকার কারণেও নিচের এররগুলো আসতে পারে,

```
[ERROR] mysqld got signal 11 (Segmentation fault)
[ERROR] InnoDB: Assertion failure
[ERROR] Fatal error: Can't open and lock privilege tables
```

Table Corruption কী? MySQL-এ টেবিল Corruption মানে হচ্ছে — কোনো ডেটাবেজ টেবিলের স্ট্রাকচার বা ডেটা ভেঙে গেছে বা খারাপ হয়ে গেছে, যেটার ফলে ওই টেবিল থেকে সঠিকভাবে ডেটা পড়া বা লেখা যায় না।

(আরো আসছে।)

## গুরুত্বপূর্ণ প্রশ্নগুলো

- Data Integrity কি?
- Schemaless কি?
- Database Indexing কি?
- কিভাবে ইনডেক্সিং query performance উন্নত করে?
- b tree এবং b+ tree এর মধ্যে পার্থক্য কি?
- Primary Key এবং Secondary Key এর মধ্যে পার্থক্য কি?
- Cluster Index কি?
- Unique এবং Non-unique index এর মধ্যে পার্থক্য কি?
- কিভাবে একাধিক ইনডেক্স একসাথে একটি query তে কাজ করে?
- Composite Index কিভাবে কাজ করে?
- FULLTEXT index কি? কিভাবে কাজ করে?
- কোন কোন column ইনডেক্সিং করবো কি না তা কিভাবে নির্ধারণ করবো?
- INSERT, UPDATE, DELETE অপারেশনগুলোর ক্ষেত্রে ইনডেক্সিং এর প্রভাব কি?
- Covering Index কি?
- Connection Pool এর প্রয়োজনীয়তা কি?
- কি হবে যদি Connection Pool এর মধ্যে কানেকশনগুলো ব্যস্ত থাকে?
- Buffer Pool এর প্রয়োজনীয়তা কি?
- select \* কেন slow?


## Section 3: Database Transaction

ডাটাবেজ ট্রানজাকশন এই সমস্ত প্রশ্ন বা সমস্যার সমাধান করতে পারে:

- ডাটাবেজ সফটওয়্যার বা হার্ডওয়্যার যে কোনো সময় fail হতে পারে। (write অপারেশনের মাঝখানেও)

- নেটওয়ার্কে বাধা আসতে পারে, যা অ্যাপ্লিকেশনকে ডাটাবেজ থেকে অপ্রত্যাশিতভাবে বিচ্ছিন্ন করতে পারে।

- একাধিক ক্লায়েন্ট একই এন্ট্রি আপডেট করার চেষ্টা করতে পারে, যার ফলে একে অপরের পরিবর্তনগুলি ওভাররাইট হতে পারে।

- একটি ক্লায়েন্ট ডাটাবেজ থেকে এমন তথ্য পড়তে পারে যা সম্পূর্ণরূপে Commit করা হয়নি, ফলে তথ্যটি অপ্রাসঙ্গিক বা অসংগতিপূর্ণ হতে পারে।

- ক্লায়েন্টদের মধ্যে concurrency বা race condition এর কারণে অপ্রত্যাশিত বাগ তৈরি হতে পারে।

উপরের পয়েন্টগুলোর উত্তর পেতে হলে নিচের টপিকগুলো বুঝতে হবে।

ডাটাবেসে Transaction বলতে বোঝায় একাধিক READ এবং WRITE অপারেশনকে একটি লজিক্যাল ইউনিট এর মধ্যে আবদ্ধ করা। এর ফলে, সমস্ত READ এবং WRITE অপারেশন একসাথে একটি একক অপারেশন হিসেবে বিবেচিত হয়। অর্থাৎ, যদি সব অপারেশন সফলভাবে সম্পন্ন হয়, তবে COMMIT করা হবে, আর যদি কোনো একটি অপারেশন ব্যর্থ হয়, তবে ROLLBACK এর মাধ্যমে পূর্বের অবস্থা ফিরিয়ে নেওয়া হবে।

সাধারণত Transaction এভাবে শুরু হয়,

```sql
BEGIN

SELECT * FROM users
UPDATE users SET username=“lahin” WHERE id=224

COMMIT
```

আপনি Prisma দিয়ে লিখতে গেলে,

```js
await prisma.$transaction(async (prisma) => {
  const users = await prisma.users.findMany();

  await prisma.user.update({
    where: { id: 224 },
    data: { username: "lahin" },
  });
});
```

🔗 **আরও পড়ুন: ডাটাবেস ট্রানসাকশান**
## Database Transaction

### Atomic update এবং Database Transaction

কোনো একদিন একজন user X একটি নির্দিষ্ট হোটেল রুম রিসার্ভ(reserve) করার চেষ্টা করছে। ঠিক একই সময় আরেকজন user Y একই রুম রিসার্ভ(reserve) করার চেষ্টা করছে।

ঠিক রাত ১১:০০:১২ ঘটিকায়, ২টি user একই সময় ফর্ম fill-up করেছে এবং "Reserve" বাটন ক্লিক করেছে।

এখন ২টি user এর ভিতর Race Condition তৈরী হবে।

ডাটাবেস ইঞ্জিন এর ভিতর Serialization ঘটবে, যাতে কোয়েরিগুলো একটি serial মেইনটেইন করে।

এখন Atomic update কিভাবে হবে?

- ধরে নি, user A এর রিকোয়েস্ট প্রথমে প্রসেস হচ্ছে,

```sql
UPDATE reservations SET status = 'booked', user_id = 1 WHERE room_number = 10;
```

User A এর জন্য রুম রিসার্ভ হয়ে গেলো।

- এখন, user B এর জন্য রিকোয়েস্ট প্রসেস হচ্ছে,

```sql
UPDATE reservations SET status = 'booked', user_id = 2 WHERE room_number = 10;
```

যেহেতু রুম নম্বর ১০ ইতিমধ্যে user_id = 1 এর দ্বারা রিসার্ভ হয়ে গেছে, সেহেতু user_id = 2 এর এই query কিছু করবে না।

**এই আচরণটি(behavior) Atomic Update নামে পরিচিত**। যা নিশ্চিত করে কমপক্ষে একটি query সফলভাবে রেকর্ড মোডিফাই করতে পারে।

এখন প্রশ্ন হচ্ছে Atomic Update থাকার পরেও আমাদের কেনো Transaction প্রয়োজন পড়ে?

ধরে নি, আমাদের সিস্টেম নিম্নলিখিত কাজগুলো করবে,

- প্রথমে user balance চেক করবে, reservation এর পূর্বে।
- রুম এর ভাড়ার পরিমান অনুযায়ী ব্যালান্স কেটে ফেলবে।
- রুম'টা রিসার্ভ করবে, ডাটাবেস এর reservation টেবিল এর মধ্যে।

**ট্রানসাকশান ছাড়া**,

— ১) user এর ব্যালান্স যাচাই করা —

```sql
SELECT balance FROM users WHERE id = 1;
```

— ২) ব্যালান্স কেটে নিলে —

```sql
UPDATE users SET balance = balance - 100 WHERE id = 1;
```

— ৩) reservations টেবিলে রুম বুক করা —

```sql
UPDATE reservations SET status = 'booked', user_id = 1 WHERE room_number = 10;
```

সমস্যা: যদি ব্যালান্স কেটে নেয়া হয়ে যায়, তখন অন্য কোনো user তার নিজের জন্য স্টেপ ৩ প্রসেস করে ফেলে তাহলে প্রথম user এর জন্য ব্যালান্স কেটে নেয়া হয়েছে কিন্তু তার জন্য রুম বরাদ্ধ করা হয় নি।

**এই সমস্যার সমাধান করে থাকে Database Transaction**।

### কখন ট্রানসাকশান ব্যবহার করতে পারি?

- Financial এবং Banking Application। কেনো? কারণ এগুলোতে Money Transfers এবং Withdrawals হয়ে থাকে।
- E-Commerce এবং Online Marketplace। কেনো? কারণ এগুলোতে Order, Payment এবং Inventory তে Consistency বজায় রাখা লাগে।

Transaction মূলত আমাদেরকে ৪'টি features দিয়ে থাকে।

- Atomicity
- Consistency
- Isolation
- Durability

### Atomicity

যখন কোনো(/একটি) ক্লায়েন্ট একাধিক WRITE অপারেশন চালাতে যায় অর্থাৎ যদি ৪ টি WRITE অপারেশন এর মধ্যে ২ টি WRITE অপারেশন successfully চালানোর পর কোনো Fault সংগঠিত হয়, (যেমন- process crushes, network communication interrupt হলে কিংবা ডিস্ক সাইজ full হয়ে গেলে।) তখন successfully সংগঠিত হওয়া অপারেশনগুলোকে রিভার্ট করে দিবে। কারণ তখন ৪ টি অপারেশন একটি সিঙ্গেল লজিকাল ইউনিট এর ভিতর থাকবে।

Atomicity ছাড়া কোন query সাকসেস কিংবা fail হয়েছে তা বের করা অসম্ভব।

### Consistency

ACID এর প্রপার্টিগুলোর মধ্যে Consistency অন্যতম গুরুত্বপূর্ণ টপিক। যার মানে হচ্ছে ট্রান্সেকশন শুরু হওয়ার পূর্বে এবং ট্রান্সেকশন শেষ হওয়ার পরে যোগফল সবসময় একই থাকবে।

উদাহরণ বলা যায়, আপনি ATM থেকে কিছু টাকা বের করতে গিয়েছেন। আপনার Account এ সর্বমোট ১০,০০০ টাকা আছে, আপনি ATM মেশিন এ ৫,০০০ টাকা বের করার জন্য আপনার PIN number দিয়ে রিকোয়েস্ট করলেন।

আপনি ৫,০০০ টাকা পেয়ে গেলেন। তাহলে এখন আপনার account এ (১০,০০০ - ৫,০০০) মানে ৫,০০০ টাকা আছে এবং ATM থেকে আপনার হাতে পেলেন ৫,০০০। (বর্তমানে একাউন্ট এ) ৫,০০০ + (নিজের হাতে) ৫,০০০ = ১০,০০০, ট্রান্সেকশন শুরু হওয়ার পূর্বে account এ ছিল ১০,০০০ এবং ট্রান্সেকশন শেষ হওয়ার পরে ১০,০০০। তাহলে আমরা বলতে পারি Consistency মেইনটেইন করা আছে।

এখন যদি ATM কোনো একটা সমস্যার কারণে আপনাকে ৫,০০০ টাকা না দিয়ে আপনার মোবাইলে SMS আসে আপনার account এ বর্তমানে ৫,০০০ আছে তাহলে তখন Consistency মেইনটেইন থাকা হলো না।

### Isolation

Isolation বাকিগুলোর মত খুবই গুরুত্বপূর্ণ বিষয়। যা আমাদেরকে নিশ্চিত করে একাধিক concurrent ট্রান্সেকশন স্বাধীনরূপে কাজ করবে, যাতে Data Integrity বজায় থাকে।

একাধিক ট্রান্সেকশন থাকার ফলে Race Condition সমস্যা তৈরী হয়। Isolation এর কাজ তা সমাধান করা, যাতে একাধিক ট্রান্সেকশন একে অপরের সাথে কোনো হস্তক্ষেপ না করে স্বাধীনভাবে কাজ করে।

Race Condition এর একটি বাস্তবধর্মী উদাহরণ হল, একটি হোটেল বুকিং ওয়েবসাইটে একজন user(1) রুম বুক করছে। পেমেন্ট প্রসেস সম্পন্ন করার পূর্বে অন্য আরেকজন user(2) এসে একই রুম বুক করার চেষ্টা করতে পারে।

এখন user(2) সব payment প্রসেস শেষ করে Database Commit(মানে স্থায়ীভাবে ডিস্কে ইন্সার্ট হবে) করে ফেললো, তারপর user(1) যখন payment প্রসেস করতে যাবে তখন Operation Failed কিংবা কোনো error মেসেজ (যেমন, রুম বুক করা হয়ে গেছে অন্য কারো দ্বারা) দেখাবে।

<p align="center">
  <img src="sections/database-transaction/images/consistency-1.png" alt="database">
</p>

এটি হচ্ছে Race Condition। এই প্রকারের সমস্যা আমরা সরাসরি কিভাবে Database Locking ব্যবহার করে সমাধান করতে পারি তা সামনে আমরা দেখবো। Isolation মূলত নির্ধারণ করে, যে একাধিক Transaction এর ফলে সৃষ্টি হওয়া সমস্যা কিভাবে দেখাবে। অন্যদিকে Locking mechanism ব্যবহার করে আমরা সেই সমস্যা সমাধান করতে পারি।

এসব সমস্যা সমাধানের পূর্বে আমাদের Isolation Level বুঝতে হবে। ৫ প্রকারের Isolation Level আছে যা বুঝা অত্যন্ত প্রয়োজনীয়।

- Read Uncommitted
- Read Commited
- Repeatable Read
- Snapshot
- Serializable

এই ৫ প্রকারের Isolation Level এর কারণে ৩ প্রকারের Anomalie তৈরী হয়।

- Dirty Read
- Non-Repeatable Read
- Phantom Read

Isolation Level বুঝার পূর্বে ৩ প্রকারের Anomalie বুঝতে হবে।

#### Dirty Read

যখন কোনো ট্রান্সেকশন UnCommitted ভ্যালু read করে তখন তাই হচ্ছে Dirty Read।

উদাহরণ, Transection A একটি নির্দিষ্ট Row এর Column আপডেট করে দিল কিন্তু এখন পর্যন্ত Commit করা হলো না। এখন Transection B একই Column read করলো। তারপর Transection A যে Column টি আপডেট করেছিল তা Rolled Back করে দিলো।

তারমানে দাঁড়ালো Transection B Dirty Read করেছে। নিচের ছবি দেখলে আমরা উদাহরণ বুঝতে পারবো।

<p align="center">
  <img src="sections/database-transaction/images/dirty-read.webp" alt="Dirty Read">
</p>

Transaction A এর দ্বারা Rollback হওয়ার কারণে, ০১:১৫ ঘটিকার সময় Transaction B এর দ্বারা Read query-টি Dirty Read হয়ে গিয়েছে।

#### Non-Repeatable Read

যখন একটি Transaction একই ডাটা read দুবার করে, কিন্তু দুবার read করার মধ্যবর্তী সময়ে ডাটা পরিবর্তন হয়ে যায়, অন্য কোনো Transaction এর কারণে, তখন সেটাই হচ্ছে Non-Repeatable Read।

উদাহরণ বলা যায়, Transaction A, accounts টেবিল read করলো। একই সময়ে Transaction B accounts টেবিল read করলো। তখন দুই Transaction একই ডাটা দেখবে। এখন ১০ মিনিট পর Transaction B একটি নির্দিষ্ট row এর balance-column এর ভ্যালু ২৯ দ্বারা পরিবর্তন করে দিলো। আর ৫ মিনিট পর Transaction B তা commit করে দিলো।

এখন Transaction B দ্বারা commit হওয়ার ৩ মিনিট পর, Transaction A আবার accounts টেবিল read করলো। এখন Transaction A পরিবর্তিত ডাটা দেখবে, যা তার পূর্বের read query সাথে সাদৃশ্য থাকবে না।

এই সাদৃশ্য না থাকার বিষয়টি হচ্ছে Non-Repeatable Read।

<p align="center">
  <img src="sections/database-transaction/images/non-repeatable-read.webp" alt="Non-Repeatable Read">
</p>

#### Phantom Read

একটি উদাহরণ দিয়ে বুঝানো যাক, একটি Transaction একটি টেবিল এর মধ্যে read query চালানোর ফলে কিছু ডাটা পাওয়া গেলো। এখন কিছু সময় পর অন্য আরেকটি Transaction এসে টেবিল এর একটি row ইন্সার্ট করে দিয়ে দিলো। তার কিছু সময় পর তা commit করা হলো। এখন পূর্বের transaction আবার read query করলে এখন ভিন্ন ডাটা দেখবে। এই বৈসাদৃশ্য এর ব্যাপারটাই হচ্ছে Phantom Read।

<p align="center">
  <img src="sections/database-transaction/images/phantom-read.webp" alt="Phantom Read">
</p>

যেকোনো Data Modification Operations মানে Insert, Update কিংবা Delete এর কারণে Phantom Read anomalie হতে পারে।

এখন আমরা Isolation Level বুঝবো সাথে তাও বুঝবো কোন Isolation Level কোন Anomalie তৈরী করে।

#### Read Uncommitted

একে Lowest Isolation Level হিসেবে বিবেচনা করা হয়। একে Lowest বলার কারণ হচ্ছে, Transaction ডাটা read করতে পারে যা অন্য Transaction এর দ্বারা manipulate হয়েছে, এমনকি সেই Transaction committed না হলেও।

তাই এই লেভেলে Dirty Read anomalie থাকতে পারে। কারণ কোনো transaction এমন কোনো ডাটা read করতে পারে যা অন্য transaction সেই manipulate হওয়া এবং যে Transaction manipulate করেছে সেই Transaction নিজ থেকে Rolled Back করে দিতে পারে।

এই লেভেলে মূলত Consistency কে গুরুত্ব দেয়া হয় নি।

#### Read Committed

এতে কোনো Transaction মনে করুন, Transaction-A যখন read করবে তখন সবসময় সে Committed ভ্যালু দেখবে। যার ফলে Dirty Read হওয়ার সুযোগ থাকে না। অন্য Transaction-B দ্বারা তৈরী কোনো Data Modification Operations যতক্ষণ না পর্যন্ত commit হচ্ছে ততক্ষন সেই Transaction-A কোনো Read করতে পারবে না।

Database Table read block করা থাকবে Transaction-A এর জন্য।

আমরা বলতে পারি, Read Committed এ Non-Repeatable Read anomalie হতে পারে।

PostgreSQL এর default Isolation Level হচ্ছে Read Committed।

#### Repeatable Read

যখন কোনো Transaction-A যতবার read query চালাবে ততবার Transaction-A একই ডাটা দেখবে, এমনকি অন্য কোনো Transaction-B দ্বারা ডাটা মোডিফাই করে থাকলেও। কিন্তু অন্য Transaction-B দ্বারা কোনো row insert হলে কিংবা delete হলে তা যখন একবার কমিট হয়ে যাবে তখন Transaction-A তা দেখতে পারবে।

Repeatable Read মূলত Row-level consistency বজায় রাখে। সেজন্য নতুন row insert কিংবা row delete হলে তা দেখা যায়।

তাহলে আমরা বলতে পারি, Repeatable Read এ Dirty Read এবং Non-Repeatable Read হবে না তবে Phantom Read anomalie হতে পারে।

MySQL database এর default Isolation Level হচ্ছে Repeatable Read।

(যদিও MySQL এর InnoDB "next-key locking" algorithm ব্যবহার করে যাতে Phantom Read anomalie না হয়।)

#### Snapshot

এই Isolation Level-এ, প্রতিটি Transaction একটি Database Snapshot এর সাথে কাজ করা হয়, যা Transaction শুরু হওয়ার সময় নিয়ে থাকে। Snapshot মূলত Database এর এক প্রকারের কপি। প্রতিটি Transaction নিজ নিজ অপারেশন স্বাধীনভাবে চালাতে পারে।

যতক্ষণ না পর্যন্ত changes কমিট করা হচ্ছে অন্য transaction দ্বারা changes কখনো দেখতে পারবে না।

এতে করে আমরা Dirty Read, Non-repeatable Read এবং Phantom Read anomalie থেকে বিরত থাকতে পারবো।

#### Serializable

একে Highest Level এর Isolation হিসেবে গণ্য করা হয়। এতে প্রতিটা Transaction গুলোর ফলাফল সিরিয়াল (একটি একটি করে) এক্সেকিউশন এর মতো দেখানো হয়ে থাকে।

এতে করে আমরা Dirty Read, Non-repeatable Read এবং Phantom Read anomalie থেকে বিরত থাকতে পারবো।

কেন আমরা কোনো Anomalie পাবো না?

- Dirty Read: কোনো Transaction আরেকটির Transaction দ্বারা তৈরী হওয়া uncommitted data পড়তে পারে না।
- Non-repeatable Read: একই query multiple times চালালে একি ডেটা রিটার্ন হয়।
- Phantom Read: নতুন বা মুছে ফেলার Transaction মধ্যে ভিন্ন ফলাফল দেখায় না।

যেহেতু Transaction গুলোর ফলাফল serially দেখানো হবে সেহেতু এই Isolation Level এ Conflict হতে পারে। দুটি কিংবা তার থেকে বেশি Concurrent Transaction একই ডেটার উপর কাজ করার চেষ্টা করে তাহলে conflict হওয়ার সুযোগ খুব বেশি। তখন,

- একটি Transaction কে rollback করা হয়।
- অথবা একটি Transaction কে wait করতে বাধ্য করা হয়।

<p align="center">
  <img src="sections/database-transaction/images/serializable.png" alt="Serializable">
</p>

- Transaction 2 এর SELECT স্টেটমেন্ট 2000 দেখতে পাবে কারণ Transaction 1 এখনও COMMIT করেনি।
- Transaction 2 এর UPDATE Conflicts করবে কারণ Transaction 1 COMMIT করার পরে balance এর মান 1950 হয়ে যায়।
- (one-after-another) অর্ডার মেইনটেইন করলে, Transaction 2 ROLLBACK হবে।
- Balance হবে 1950।

একটি গুরুত্বপূর্ণ প্রশ্ন রয়ে যায়,

Transaction 2 update অপারেশন চালানোর সময় কেনো Transaction 1 এর দ্বারা কমিট করা ভ্যালু দেখতে পায় না?

প্রতিটা Transaction তাদের Transaction এর শুরুতে টেবিলের একটি consistent snapshot capture করে এবং read queries এই snapshot থেকে কাজ করে। এজন্য read queries অন্য Transaction দ্বারা commit করা ভ্যালু দেখতে পায় না। তবে write queries এর ক্ষেত্রে ডাটাবেস serializability বজায় রাখার জন্য conflict detection প্রয়োগ করে।

যদি Transaction 2 কনফ্লিক্টের কারণে Rollback করা হয়, তবে Transaction 2 এর সব মধ্যবর্তী পরিবর্তন বাতিল হয়ে যাবে। যখন Transaction 2 restart হবে তখন সে নতুন consistent snapshot দেখবে যা Transaction 1 এর দ্বারা পরিবর্তিত।

এখন একাধিক Transaction এর জন্য আমরা practically কিভাবে consistency বজায় রাখতে পারবো?

আমাদের কাছে ২ টি option আছে,

- Pessimistic Locking
- Optimistic Locking

## Pessimistic Locking

Pessimistic Locking এ যখন কোনো ডাটা access কিংবা update করা হয় তখন সেই row কিংবা সেই ডাটাকে lock করে রাখা হয়, যাতে অন্য Transaction তা কোনো প্রকারের মোডিফাই করতে না পারে।

### Pessimistic Locking এবং Serializable Isolation level

যদিও Serializable isolation level নিশ্চিত করে Serializability, তবুও আমাদের Locking Mechanism ব্যবহার করা লাগে।

যেমন: একটি Transaction নির্দিষ্ট row এর উপর কাজ চলাকালীন, অন্য Transaction সেই row read করতে না পারে সেজন্য Pessimistic Locking কাজে আসবে।

MySQL এ আমরা যেভাবে Isolation Level Serializable বাছাই করে Pessimistic Locking ব্যবহার করতে পারি।

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;

SELECT balance FROM accounts WHERE id=1 FOR UPDATE;

UPDATE accounts SET balance=balance-50 WHERE id=1;

COMMIT;
```

(চলমান...)


## Section 4: Client Server Architecture

ক্লায়েন্ট রিকুয়েস্ট করবে সার্ভারকে কিছু স্পেসিকিফ রিসোর্স এর জন্য, সার্ভার সেই রিকুয়েস্ট পাওয়ার পর সে তার যাবতীয় প্রসেস শেষ করে ক্লায়েন্টকে রেসপন্স দিয়ে দিবে, এটি ক্লায়েন্ট সার্ভার আর্কিটেকচার।

<p align="center">
  <img src="./images/csa.png" alt="Client Server Architecture">
</p>

আমাদের সব উদাহরণ থাকবে ক্লায়েন্ট সার্ভার আর্কিটেকচারের উপর ভিত্তি করে।

## Section 5: Reliability

সিস্টেম যদি কোনো প্রকারের Fault/Error থাকার পরও ভালোভাবে কাজ করতে পারে কিংবা সিস্টেমটি যদি বন্ধ না হয়, তবে সেই সিস্টেমটি Reliable। আমাদের মনে রাখতে হবে এক বা একাধিক Fault এর কারণে সিস্টেম Failure হতে পারে।

Fault এরকম হতে পারে কোনো user সিস্টেমটি কে এমনভাবে ব্যবহার করেছে যাতে কোনো Failure হয়ে গেল, সেটা ইচ্ছাকৃত বা অনিচ্ছাকৃতভাবেও হতে পারে, তখন যদি সিস্টেমটি বন্ধ না হয়ে কোনো প্রকারের Warning message দেখালো তখন সেই সিস্টেমটিকে আমরা Reliable বলতে পারি।

🔗 **আরও পড়ুন: রিলাইবিলিটি**
## Reliability

সিস্টেম কোনো প্রকারের Fault/Error থাকার পরও কাজ করতে পারে সেটাই Reliability। তখন সেই সিস্টেমকে Fault Tolerant বা Resilent বলে।

সাধারণত ৩ প্রকারের Fault রয়েছে যা থাকলে আমরা সিস্টেমটিকে UnReliable করে ফেলে,

### Hardware Fault

সিস্টেম UnReliable করতে Hardware Fault এর ভূমিকা রয়েছে। যেমনঃ Electricity Power Cut হওয়ার ফলে সিস্টেম বন্ধ হয়ে যেতে পারে তখন সেই সিস্টেমটি UnReliable হয়ে পড়ে।

### Software Fault

Software এর কোনো বাগ (bug) যদি আমাদের সিস্টেম Crash করে ফেলে তাহলে সেটা Software Fault। আমরা সেই Fault গুলোকে Testing (Unit, Integration) দ্বারা প্রতিরোধ করতে পারি।

### Human Fault

মানুষ(Developer) যখন সিস্টেমটিতে কোনো ভুল Configuration করে থাকে আর সেজন্য যদি সিস্টেমটি Crash করে ফেলে, তখন সেটা আর Reliable হল না। এরকমের Fault গুলোকে আমরা Testing (Unit, Integration) দ্বারা প্রতিরোধ করতে পারি। অন্য পদ্ধতি হল আমরা Sandbox Environment তৈরি করে রাখতে পারি যেখানে মানুষ Explore কিংবা Experiment করতে পারবে আমাদের Features গুলোকে, কোনো প্রাকারের Real User কে effect করা ছাড়া।

## Availability

Availability মানে হলো, কম্পোনেন্টগুলো (Database server, Cache server ইত্যাদি) সঠিকভাবে নিজ নিজ অপারেশন চালিয়ে যেতে পারে।

## High Availability

একাধিক ক্লায়েন্ট যখন একাধিক সার্ভারে Load Balancer এর মাধ্যমে সার্ভ হচ্ছে তখন কোনো কারণে যদি একটি সার্ভার ডাউন হয়ে যায় তখন অন্য সার্ভারের মাধ্যমে সার্ভ করা হয়, তা হচ্ছে High Availability।

<p align="center">
  <img src="sections/reliability/images/high-availability.png" alt="High Availability">
</p>

Load Balancer Health Check ব্যবহার করে ট্র্যাক করবে কোন কোন Server Instance ঠিকভাবে কাজ করছে কি না। Load Balancer যখন দেখবে যে Server Instance ঠিকভাবে কাজ করছে না সে সার্ভারে আর রিকোয়েস্ট ফরওয়ার্ড করবে না।

## Fault Tolerant

যখন কোনো সার্ভারের ডিপেন্ডেন্সি failure হয় তখন সার্ভারের এর ডিপেন্ডেন্সি failure handle করাকে Fault Tolerant বলে।

<p align="center">
  <img src="sections/reliability/images/ft.png" alt="Fault Tolerant">
</p>

Server 1 যদি Server 2 এর সাথে ডিপেন্ডেন্ট থাকে, আর কোনো কারণে Server 2 ক্র্যাশ হয় তখন Server 1 এর সেই situation handle করাকে Fault Tolerant বলে।

## Downtime

কোনো সার্ভার যতসময় বন্ধ(down) থাকে সেই সময়টুকুকে Downtime বলে।

## Availability Measurement

কোনো সিস্টেমের Availability সাধারণত % হিসেবে ধরা হয়। কিভাবে আমরা সিস্টেমের Availability বের করবো?

ফর্মুলা হচ্ছে,

Availability (%) = ( Uptime / (Downtime + Uptime) ) \* 100

এখানে uptime হচ্ছে, সর্বমোট সময় সিস্টেম অপারেট করেছে, কোনো প্রকারের interaption ছাড়া।

আর Downtime হচ্ছে, সর্বমোট কত সময় সিস্টেম কোনো প্রকারের সমস্যার জন্য বন্ধ ছিল।

সিস্টেম যদি একটি নির্দিষ্ট মাসে ৩৯০০ মিনিট ঠিকভাবে অপারেট করে এবং ১৫০ মিনিট ডাউনটাইম হয় তাহলে,

(৩৯০০ / ৪০৫০) \* ১০০ = ৯৬.২৯%

## The x-9 structure of Availability

যখন বলা হয় সিস্টেমের availability 99.99% তারমানে হল এক বছরে(কিংবা এক মাসে) সিস্টেমের ডাউনটাইম হবে

এক বছর হলে,

মোট মিনিট প্রতি বছরে = 365×24×60 = 525,600 minutes

Downtime = (1−0.9999)×525,600 = 0.0001×525,600 = 52.56 minutes

যেমন, AWS S3 এর Availability বলা হয় 99.99%।

| Availability %           | Downtime per year   |
| ------------------------ | ------------------- |
| 90% (one nine)           | 36.53 days          |
| 99% (two nines)          | 3.65 days           |
| 99.9% (three nines)      | 8.77 hours          |
| 99.99% (four nines)      | 52.60 minutes       |
| 99.999% (five nines)     | 5.26 minutes        |
| 99.9999% (six nines)     | 31.56 seconds       |
| 99.99999% (seven nines)  | 3.16 seconds        |
| 99.999999% (eight nines) | 315.58 milliseconds |
| 99.9999999% (nine nines) | 31.56 milliseconds  |

## Single Point of Failure

যদি সিস্টেমের কোনো পার্ট নষ্ট হয়ে যায় এবং সিস্টেম যদি Fault Tolerant না হয় তাহলে এর জন্য সম্পূর্ণ সিস্টেম বন্ধ হয়ে যায় তাহলে সেই নষ্ট হয়ে যাওয়া পার্ট হল Single Point of Failure।

উদাহরণ, ডাটাবেস সার্ভার নষ্ট হয়ে গেলে সম্পূর্ণ সিস্টেম কাজ করা বন্ধ হয়ে যেতে পারে,

<p align="center">
  <img src="sections/reliability/images/spof.png" alt="Single Point of Failure">
</p>

আরেকটি উদাহরণ Region বন্ধ হয়ে গেলে সেই Region এর সম্পূর্ণ সিস্টেম বন্ধ হয়ে যেতে পারে।

<p align="center">
  <img src="sections/reliability/images/spof-2.png" alt="Single Point of Failure">
</p>

### কিভাবে Single Point of Failure কে প্রতিরোধ করবো?

ধরুন আমাদের একটি সিস্টেম আছে যেখানে একটি সার্ভার নোড এবং একটি ডেটাবেস সার্ভার আছে।

<p align="center">
  <img src="sections/reliability/images/spof-3.png" alt="Single Point of Failure">
</p>

এখানে **সার্ভার নোড** আর **ডাটাবেস** হচ্ছে Single Point of Failure। সার্ভার নোড কিংবা ডাটাবেস বন্ধ হয়ে গেলে সম্পূর্ণ সিস্টেম ডাউন হয়ে যাবে। Single Point of Failure prevent করতে হলে আমাদের,

- একাধিক সার্ভারের সাপোর্ট দিতে হবে।
- একাধিক ডেটাবেস সার্ভার মানে <a href="../../README.md#section-15-database-replication" target="_blank">Database Replication</a> করতে হবে।

এখন একাধিক সার্ভার যোগ করার পর, আমরা Load Balancer এর মাধ্যমে একাধিক সার্ভারে ক্লায়েন্ট রিকোয়েস্ট ডিস্ট্রিবিউট করতে পারি।

<p align="center">
  <img src="sections/reliability/images/spof-4.png" alt="Single Point of Failure">
</p>

এখানে Load Balancer নিজে Single Point of Failure। একাধিক Load Balancer যোগ করে DNS এর মাধ্যমে আমাদের ক্লায়েন্ট রিকোয়েস্ট নির্দিষ্ট Load Balancer চলে যাবে।

এরকম আমরা Single Point of Failure prevent করতে পারব।

## 500 - Internal Server Error কী সম্পূর্ণ সিস্টেম ডাউন করতে পারবে?

হ্যাঁ, যদি সমস্যা সার্ভারের মূল অংশে বা ডাটাবেজে হয়, তবে এটি পুরো সিস্টেমকে ডাউন করে দিতে পারে।

- ডাটাবেজ সংযোগ বিচ্ছিন্ন বা ডাউন থাকলে।
- যদি একটি ডাটাবেস স্কিমা আপডেট, সঠিকভাবে বিদ্যমান ডাটা মাইগ্রেট না করে ডিপ্লয় করা হয়, তবে অ্যাপ্লিকেশনটি ক্র্যাশ করতে পারে কারণ কিছু কলাম, টেবিল বা সম্পর্ক অনুপস্থিত বা পরিবর্তিত হতে পারে।
- যদি সার্ভারে মেমোরি লিক হয় বা কোনো প্রসেস অতিরিক্ত রিসোর্স ব্যবহার করে (100% CPU Usage), তাহলে সার্ভার সম্পূর্ণরূপে ক্র্যাশ করতে পারে।
- যদি আপনার application এ error throw করা হয় যা properly caught করা হয় নি, তা আমাদের সম্পূর্ণ সিস্টেম ডাউন করে দিতে পারবে। উদাহরণ,

```js
// in express.js/node.js
app.get("/", (req, res) => {
  throw new Error("Something went wrong!");
});
```

সম্পূন সিস্টেম ডাউন না হওয়ার জন্য এটি যোগ করবেন,

```js
// in express.js/node.js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
```

আপনি যদি `app.use((err, req, res, next) => {})` ব্যবহার করে থাকেন তাহলে তা আপনাকে express.js এর error গুলো handle করে দিবে।

আর আপনি যদি,

```js
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Rejection:", promise, "Reason:", reason);
  process.exit(1);
});
```

ব্যবহার করেন তাহলে তা Synchronous error গুলো catch/handle করে দিবে, যদি আপনি try-catch এর ভিতর handle না করে থাকেন।

উপরের ৪ টি পয়েন্ট আমাদের সিস্টেম এর Reliability নিয়ে প্রশ্নবিদ্ধ করবে। এজন্য Logging করে দেখতে হবে আমাদের সিস্টেম ঠিক আছে কি না।


## Section 6: Performance Metrics

### Throughput

একটি নির্দিষ্ট সময়ের ভিত্তিতে কোনো সিস্টেম যতটুকু কাজ সম্পাদন করতে পারে সেটি হচ্ছে Throughput। যেমন, প্রতি ১০ সেকেন্ড এ সিস্টেম যদি ৫০ টি API request সম্পন্ন করতে পারে তাহলে তার Throughput হবে ৫০/১০ = ৫।

### Time to First Byte

ক্লায়েন্ট Resource জন্য যখন সার্ভারকে Request করে এবং ক্লায়েন্ট সার্ভার থেকে FIRST BYTE of Response যখন গ্রহণ করে তার মধ্যকার সময়টুকু (Request করা থেকে শুরু করে এবং FIRST BYTE গ্রহণ করার সময় পর্যন্ত) হল Time to First Byte।

🔗 **আরও পড়ুন: পারফরম্যান্স ম্যাট্রিক্স**
## Performance Metrics

### Latency

যখন রিকুয়েস্ট Client থেকে শুরু করে Server পর্যন্ত যেতে যত সময় লাগে এবং সেই Server থেকে আবার রেসপন্স যখন Client এ আসতে যত সময় লাগে সেই সময়টুকু হল Latency। Latency মূলত Network এর সময়টুকুর উপর নির্ভরশীল।

<p align="center">
  <img src="sections/performance-metrics/images/latency.png" alt="Latency">
</p>

### Response Time

Response Time হল Server রিকুয়েস্ট প্রসেস করতে যত সময় নেয়, সেই সময় আর Latency এর সময়টুকুর সমষ্টি।

<p align="center">
  <img src="sections/performance-metrics/images/response-time.png" alt="Response Time">
</p>

### Error Rate

সিস্টেম রিকোয়েস্ট প্রসেস করার সময় যতগুলো Error আসে আর সর্বমোট যতগুলো রিকোয়েস্ট প্রসেস করা হয় তার ভাগফল হল Error Rate। এটি খুবই গুরুত্বপূর্ণ যদি High Available System তৈরী করতে চান।


## Section 7: Distributed System

একাধিক কম্পিউটার (বা কম্পোনেন্ট) একসাথে কাজ করার ফলে কোন কাজ শেষ হয় এবং End User এর কাছে একটি কম্পিউটার (বা কম্পোনেন্ট) হিসেবে আসে, সেই সিস্টেমটি হল ডিস্ট্রিবিউটেড সিস্টেম। এই মেশিনগুলোতে শেয়ার্ড স্টেট(Shared State) থাকে, কঙ্কারেন্টলি (Concurrently) কাজ করতে পারে, প্রতিটি সিস্টেম একে অপরের সাথে Information শেয়ার করতে পারবে।

বর্তমান সময়ে Distributed System এর উদাহরণ হল YouTube।

YouTube কেন?

- সার্ভার User থেকে রিকুয়েস্ট পায় Video Upload কিংবা Video Watch করার জন্য।
- ভিডিও এনকোড।
- ডাটাবেস সিস্টেম।

এগুলো সবকিছু মিলে Distributed System YouTube তৈরি করে।

## Section 8: Domain Name System

Domain Name System কিংবা DNS একটি নির্দিষ্ট Human Readable Domain (যেমন www.google.com) কে একটি নির্দিষ্ট IP-তে রূপান্তর করে।

আপনি যখন ব্রাউজারে URL টাইপ করেন (যেমন www.google.com)। DNS সাধারণত আপনার দেয়া URL এর IP Address বের করবে এবং সেই IP Address এ আপনার রিকুয়েস্ট প্রসেস হবে।

এই রূপান্তর করার পদ্ধতিটা শুরু হয় DNS Resolver দিয়ে,

- DNS Resolver মূলত Human Readable Domain কে নির্দিষ্ট IP-তে রূপান্তর করে থাকে। এর ৩টি পার্ট আছে,

  - Root Server, এই সার্ভার মূলত .com, .org, .net ইত্যাদির তথ্য রাখে এবং সেগুলোর IP সেই DNS Resolver কে দিয়ে থাকে যেমন .com এর জন্য .com এর IP, .org এর জন্য .org এর IP

  - Top Level Domain Server, এই সার্ভার মূলত প্রতিটি Top Level Domain (www.google.com এর TLD হল .com) এর Authoritative Server এর তথ্য নিজের মধ্যে রাখে।

    - সাধারণ top-level domains: .com, .org, .gov
    - দেশীয় code top-level domains: .jp, .uk, .bd

  - Authoritative Server, এই সার্ভারের মধ্যে সেই Human Readable Domain (যেমন www.google.com) এর IP পাওয়া যায়।

<p align="center">
  <img src="./images/dns.png" alt="DNS">
</p>

🔗 **আরও পড়ুন: ডোমেইন নেইম সিস্টেম**
## DNS Query Types

DNS এ তিন প্রকারের query থাকে, যার মাধ্যমে DNS সার্ভার রিকোয়েস্ট কে প্রসেস করতে পারে।

- Recursive Query: এতে DNS resolver থেকে যতক্ষণ না পর্যন্ত রেসপন্স না পাওয়া যায় ততক্ষন DNS সার্চ query মানে Root সার্ভার থেকে শুরু করে Authoritative সার্ভার পর্যন্ত প্রসেস চলতে থাকবে। যদি NXDOMAIN (Non-Existent Domain) পায় তাহলে আর সার্চ করবে না সরাসরি "not found" মেসেজ পাঠিয়ে দিবে। মনে করি, আমাদের ডোমেইন `www.notfound.com`

  - প্রথমে Recursive Root Server .com এর TLD বের করবে।
  - তারপর TLD তে চেক করা হবে, যদি কিছু না পাওয়া যায় তাহলে ক্লায়েন্ট এর কাছে NXDOMAIN (Non-Existent Domain) পাঠিয়ে দিবে। (NXDOMAIN পাঠিয়ে দেয়ার পর Recursive Root Server আর check করবে না।)

- Non-recursive Query: এতে DNS সার্ভার human-readable ডোমেইন DNS Cache এর মধ্যে IP পাওয়া যায় তাহলে সেই IP পাঠিয়ে দিবে অন্যথায় "not found" রেসপন্স পাঠাবে।

- Iterative Query: এতে DNS Resolver প্রথমে তার নিকটবর্তী সার্ভাররের(DNS Cache) কাছে থেকে ইনফরমেশন নিয়ে আসবে, আর যদি না পায় তাহলে next available DNS সার্ভার এর মধ্যে আবার query করবে। যদি NXDOMAIN (Non-Existent Domain) পায় তাহলে আর করি করবে না directly "not found" মেসেজ পাঠিয়ে দিবে।

## ডোমেইন নেইম সিস্টেম(DNS) এর রেকর্ড টাইপ

যখন আমরা একটি ডোমেইন রেজিস্টার করতে যাই, তখন আমাদের DNS সেটআপ করে দিতে হয়। মানে কোন IP তে ডোমেইন পয়েন্ট করা থাকবে। সেটআপ করার সময় কিছু DNS টাইপ থাকে, আমাদের প্রয়োজন অনুযায়ী নির্বাচন করব।

- A: A রেকর্ড টাইপ মূলত একটি ডোমেইন এর IP এড্রেস দিয়ে তার সার্ভার খুঁজে বের করতে সাহায্য করে থাকে। মনে করি, আমাদের ডোমেইন হচ্ছে google.com এবং তার IP এড্রেস হচ্ছে 192.168.0.1, আমরা যখন A টাইপ নির্বাচন করব তখন IP টি বলে দিতে হবে।

  এখন আরেকটি অপসন থাকে যাকে Name বলা হয় সাধারণত, যেখানে আমরা হয় @ ব্যবহার করতে পারবো না হয় অন্য কোনো ওয়ার্ড।

  যদি আমরা @ ব্যবহার করি তাহলে তা root ডোমেইনকে IP এড্রেস এর সাথে পয়েন্ট করবে।

  @ => google.com => 192.168.0.1

  যদি ওয়ার্ড হিসাবে app ব্যবহার করি তাহলে সেটি সাব-ডোমেইন হিসেবে IP পয়েন্ট করা হবে।

  app.google.com => 192.168.0.1

- CNAME: CNAME মূলত একটি ডোমেইন কে অন্য ডোমেইন এর IP সাথে পয়েন্ট করে দিবে। মনে করে, আমাদের ডোমেইন google.com এখন আমরা সরাসরি এতে কোন IP সেট না করে অন্য একটি ডোমেইন facebook.com পয়েন্ট করে দেই। তাহলে পরবর্তীতে যখন কেউ google.com এ যাওয়ার চেষ্টা করতে তখন তা facebook.com এর IP তে চলে যাবে।

## DNS Zone

DNS Zone হলো DNS এর একটি portion যেখানে একটি নির্দিষ্ট ডোমেইন এবং সাবডোমাইন একটি administrator দ্বারা নিয়ন্ত্রিত হয়ে থাকে।

## উদাহরণ

- Route53
- Cloudflare DNs


## Section 9: Transmission Control Protocol

Transmission Control Protocol অথবা TCP হচ্ছে একটি নেটওয়ার্ক প্রোটোকল যেখানে একাধিক Device একে অপরের সাথে মেসেজ আদান-প্রধান করতে পারে।

TCP কে Reliable বলা হয় কারণ যতক্ষণ পর্যন্ত ডিভাইসগুলো একে অপরের সাথে মেসেজ অদান-প্রধান শেষ হবে না ততক্ষন connection বন্ধ হবে না।

Transmission শুরু হওয়ার পূর্বে TCP 3-way-handshake ব্যবহার করে connection established করে। এটি ৩টি স্টেপে হয়ে থাকে,

- SYN (synchronize): এই flag দ্বারা TCP কানেকশন establish করার রিকোয়েস্ট করা হয়।
- SYN-ACK (synchronize-acknowledge): এই flag কানেকশন establish করতে ব্যবহার করা হয়।
- ACK (acknowledge): এই flag দ্বারা কানেকশন establish সম্পন্ন হওয়ার acknowledge করা হয়।

এই 3-way-handshake নিশ্চিত করে Device'গুলো(ক্লায়েন্ট-সার্ভার) একে অপরের সাথে মেসেজ আদান-প্রধান করতে পারবে কি না।

TCP Reliability নিশ্চিত করে সাধারণত Acknowledgments এবং Retransmissions পদ্ধতি ব্যবহার করে। TCP তে মূলত যখন ক্লায়েন্ট ডেটা send করে সার্ভার রিকোয়েস্ট টি কে Acknowledge করে। ক্লায়েন্ট যদি Acknowledge না পায় তখন ক্লায়েন্ট আবার রিকোয়েস্ট Retransmission করবে। এরকম Reliability নিশ্চিত হয়ে থাকে।

<p align="center">
  <img src="./images/tcp-1.png" alt="tcp">
</p>

TCP মূলত Networking এর OSI Model এর Practical Form। এটি Transport Layer থেকে শুরু হয় এবং Application Layer এ কাজ করে।

HTTP, Web Socket, FTP ইত্যাদি মূলত TCP তে চলে।

## Section 10: User Datagram Protocol

UDP মূলত OSI Model এর Transport Layer-এ অবস্থান করে। TCP এর মত এটি reliable না। এতে কোনো 3-way handshake তৈরী হয় না। এটি মূলত Low Latency এবং unreliable connection তৈরী করে।

UDP Process to Process communication establish করে।

TCP তে যেহেতু 3-way handshake তৈরীর মাধ্যমে reliable connection তৈরী হয়, কিন্তু এই 3-way handshake তৈরী করতে সময়ের প্রয়োজন হয় সেজন্য performance কম পাওয়া যায়। Performance এর কথা বিবেচনা করলে UDP একটি better choice।

UDP তে কোনো Error checking হয় না।

<p align="center">
  <img src="./images/udp.png" alt="udp">
</p>

UDP এর use-cases:

- Real-time Communication; উদাহরণ: Skype, Zoom.
- Live Video Streaming; উদাহরণ: Twitch, ESPN+.
- Online Gaming; উদাহরণ: Call of Duty.

UDP লাইভ ভিডিও স্ট্রিমিংয়ের জন্য ব্যবহৃত হয়, কারণ Live ইভেন্টের সাথে সম্প্রচারটি sync রাখা বেশি গুরুত্বপূর্ণ না। UDP ব্যবহার করার সময়, যদি কিছু ফ্রেম হারিয়ে যায়, সেগুলো পুনরায় প্রেরণ করা হয় না। উদাহরণ,

আপনি বিপিএল (ক্রিকেট) দেখছেন। ওভার ১.২-তে হঠাৎ বাফারিং শুরু হলো, আর এখন ওভার ১.৪ চলছে। ওই দুই বল নিয়ে আপনি তেমন চিন্তা করছেন না। আপনি পরের বল দেখছেন। এটি হচ্ছে UDP।

## Section 11: HTTP, TLS and HTTPS

HTTP অর্থাৎ Hyper Text Transfer Protocol, HTTP এক প্রকারের বৈশিষ্ট প্রদান করে থাকে, যার মাধ্যমে Web Browser এবং Web Server নিজেদের ভিতর communication করে থাকে। এটি এক প্রকারের set of rules যা ডেটা ক্লায়েন্ট থেকে সার্ভারে পাঠানো সাহায্য করে। ডেটা হতে পারে Text, Image ইত্যাদি। ক্লায়েন্ট এবং সার্ভারের ভিতর ডেটা আদান প্রধান plain-text এ হয়ে থাকে, এর ফলে HTTP secured না।

TLS কিংবা Transport Layer Security, এটি হলো Cryptographic Protocol যা মূলত communication সুরক্ষিত করার জন্য ব্যবহার করা হয়। এটি ডাটা এনক্রিপ্ট করে থাকে ডাটা ক্লায়েন্ট থেকে সার্ভারে ট্রান্সমিট হওয়ার সময়।

HTTPS অর্থাৎ Hyper Text Transfer Protocol Secure, এটি নিজে HTTP এর সকল বৈশিষ্ট বহন করে শুধু SSL/TLS যোগ করে, ক্লায়েন্ট এবং সার্ভারের মধ্যে ডেটা ট্রান্সফার Encrypted হয়ে থাকে।

<p align="center">
  <img src="./images/http-https.png" alt="http and https">
</p>

🔗 **আরও পড়ুন: এইচটিটিপি, টিএলএস এবং এইচটিটিপি'এস**
## HTTP 1

HTTP 1 ১৯৯৬ সালে এসেছে। এটি মূলত TCP এর উপর নির্ভর করে তৈরী করা হয়েছিল। এখানে প্রতিটি HTTP রিকোয়েস্ট এর জন্য ডেডিকেটেড TCP connection তৈরী হত। যেমন একটি পেজ এ যদি ১০ টি জাভাস্ক্রিপ্ট লোড করা লাগে তাহলে এই ১০ টি জাভাস্ক্রিপ্ট এর জন্য ১০ টি TCP Connection তৈরী হবে।

## HTTP 1.1

HTTP 1.1 এ keep-alive mechanism তৈরী করা হয়েছিল যার মাধ্যমে একটি TCP কানেকশন কে একাধিক HTTP request এবং response এ reuse করা যেত, যাকে Pipelining বলে। Pipelining মূলত Sequentially হয়ে থাকে।

একটি TCP connection reuse করে করে আমরা সব content/request করতে পারি।

আর আমাদের content request এর জন্য TCP connection প্রয়োজন, TCP connection নতুন করে তৈরী হচ্ছে না তবে concurrent requests বেশি হওয়ার কারণে keep-alive scalable না।

HTTP 1.1 এ CORS mechanism আনা হয়েছিল।

## HTTP 2

HTTP 2 তে Multiplexing আনা হয়েছিল যার মানে একাধিক STREAMS of REQUESTS একটি TCP connection এর ভিতর transfer হতে পারে। HTTP 1 এ প্রতিটা কনটেন্ট request এর জন্য একটি reuse করা TCP connection ব্যবহার করা হত কিন্তু HTTP 2 তে একাধিক রিকোয়েস্ট একটি single TCP connection এর মধ্যে যেত।

<p align="center">
  <img src="sections/http-tls-and-https/images/http-2.png" alt="http 2">
</p>

HTTP 2 এর জন্য TLS setup বাধ্যতামূলক, মানে HTTPS enable থাকতে হবে।

HTTP 2 এর একটি feature হল HPACK। HPACK মূলত HTTP headers কে compress করে থাকে। HTTP 1 এ headers plain-text ফরম্যাটে send করা হত, HPACK efficiently headers transmit করে থাকে।

HTTP 2 এর সবচেয়ে বড় Limitation হল, যখন Stream of Requests একটি single TCP connection এর মধ্য দিয়ে যায় তখন কোনো কারণে যদি একটি রিকোয়েস্টের Packet Loss হয় তাহলে সব রিকোয়েস্ট এর উপর নেগেটিভ ইমপ্যাক্ট পড়বে। তার মূল কারণ TCP এর কাজ হল একই order মেইনটেইন করে সব packet/request এক end থেকে অন্য end এ ডেলিভার করা, এখন যদি একটিও packet loss হয় তাহলে TCP আর order maintain করতে পারবে না।

এই সমস্যাকে Head of Line Blocking বলে।

## HTTP 3

এই Head of Line Blocking সমস্যা সমাধানের জন্য Google একটি নতুন প্রোটোকল তৈরী করেছিল যার নাম QUIC(Quick UDP Internet Connections)। এখানে আমরা TCP ব্যবহার না করে QUIC ব্যবহার করলে যা সুবিধাটি পাবো তা হল যখন packet loss হবে তখন অন্য packet/request এ কোনো প্রভাব ফেলবে না।

<p align="center">
  <img src="sections/http-tls-and-https/images/quic.png" alt="QUIC">
</p>

QUIC মূলত UDP প্রটোকলের উপর ব্যবহার হয়ে থাকে। সেজন্য এখানে TCP মত Reliability নিশ্চিত করা যায় না।

এখানে TCP এর মত 3-way handshake তৈরী হয় না, QUIC নিজের initial handshake এ সব encryption সহ TLS এর কাজ হয়ে থাকে।

<p align="center">
  <img src="sections/http-tls-and-https/images/quic-2.png" alt="QUIC">
</p>

## কিভাবে যাচাই করবেন কোনো ওয়েবসাইট কোন ভার্সন এর HTTP ব্যবহার করছে?

```
curl -I -s -o /dev/null -w "%{http_version}\n" https://google.com
```

## গুরুত্বপূর্ণ প্রশ্নগুলো

- HTTP 1.1, HTTP 2, এবং HTTP 3 এগুলোর মধ্যে পার্থক্য কি?
- HTTP এবং HTTPS মধ্যে পার্থক্য কি?
- Pipelining কি?
- TLS কিভাবে HTTP(S) কে সুরক্ষা করে থাকে?
- SSL/TLS certificate কি?
- আপনার ওয়েবসাইট HTTPS এ লোড না হয়ে থাকলে কিভাবে troubleshoot করবেন?


## Section 12: What happens when you type a URL in your browser

<p align="center">
  <img src="./images/what-happens.jpeg" alt="what happens">
</p>

(ছবিটি ইন্টারনেট থেকে ডাউনলোড করা)। আপনি যখন আপনার ব্রাউজার এর Address Bar এ URL টাইপ করে enter press করবেন, আপনার ব্রাউজার প্রথমে আপনার রিকোয়েস্টটিকে DNS সার্ভার এ পাঠিয়ে দিবে তারপর দেখবে DNS cache এর ভিতর সেই URL এর IP এড্রেস আছে কি না। যদি না থাকে তাহলে বিভিন্ন steps শেষ করার পর DNS সেই URL এর IP রিটার্ন করবে।

তারপর 3-way handshake এর মাধ্যমে IP address এর সার্ভার এর সাথে TCP কানেকশন তৈরী হবে।

পরবর্তীতে browser TCP কানেকশন এর সাহায্যে সেই সার্ভারে HTTP রিকোয়েস্ট করে।

সার্ভার রিকোয়েস্ট প্রসেস করে তারপর রেসপন্স রিটার্ন করে থাকে। ব্রাউজার সেই রেসপন্স কে বিভিন্ন স্টেপ শেষ করে ব্রাউজারে দেখায়।

## Section 13: Concurrency and Parallelism

Concurrency এবং Parallelism বুঝতে হলে আমাদেরকে Process এবং Thread অপারেটিং সিস্টেম এর আলোকে বুঝতে হবে।

Process কি? একটি প্রোগ্রাম(code) যখন execution অবস্থায় থাকে, তখন সেটি একটি Process। এটি এমন একটি environment বা container, যেখানে প্রোগ্রামের জন্য প্রয়োজনীয় সমস্ত রিসোর্স (যেমন, CPU টাইম, মেমরি) বরাদ্দ করা হয় এবং প্রোগ্রামটি চালানো(execute) হয়।

Thread কি? এটি মূলত Process এর Subset। একে Independent Execution Unit ও বলা হয়। একটি Process-এ এক বা একাধিক Thread থাকতে পারে, Thread মূলত Process এর Shared Resource গুলো ব্যবহার করে থাকে। তার কাজ হচ্ছে প্রোগ্রাম এর অপারেশনগুলোকে Concurrently কিংবা Parallelly(core এর উপর নির্ভর করে) execute করা।

Thread ভালোভাবে বুঝার জন্য Concurrency এবং Parallelism বুঝা যাক।

Concurrency কি? Concurrency হচ্ছে Thread এর মধ্যে একাধিক কাজ থেমে থেমে একসঙ্গে সম্পন্ন হচ্ছে, যদি ১টি CPU কোর থাকে।

ধরুন CPU কোর হচ্ছে ১টি, একাধিক কাজ Thread এর মধ্যে যখন থাকে, তখন Context Switching এর মাধ্যমে CPU দ্রুতভাবে একে অপরকে সময় ভাগ করে, অর্থাৎ একটি কাজ থেমে CPU অন্য কাজ শুরু করে, তারপর আবার সেই কাজ পুনরায় চালু করে যতদূর পূর্বের execution এ সম্পন্ন হয়েছে, তারপরের অংশ থেকে আবার শুরু হয়।

যতক্ষণ না পর্যন্ত সব কাজ শেষ হচ্ছে, এরকম চলতে থাকবে।

<p align="center">
  <img src="./images/concurrency.png" alt="Concurrency">
</p>

Parallelism কি? একাধিক কাজ একই সময়ে আলাদাভাবে/স্বাধীনভাবে সম্পন্ন করা, এবং এটি সম্ভব যখন একাধিক CPU core থাকে।

ধরুন CPU কোর হচ্ছে ২টি, একাধিক কাজ Thread গুলোর মধ্যে execute হবে।

<p align="center">
  <img src="./images/parallelism.png" alt="Parallelism">
</p>

একাধিক কোর এর মধ্যেও Concurrency হয়ে থাকে। কখন?

যখন সব Thread ব্যস্ত হয়ে পড়বে তখন অন্য Task গুলোর জন্য Context Switching এর মাধ্যমে Task গুলো সম্পাদন করা হবে।

Parallelism উদাহরণ I/O bound task এর জন্য Node.js দিয়ে,

```js
const fetch = require("node-fetch");

async function fetchData() {
  const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
  ];

  const promises = urls.map((url) => fetch(url).then((res) => res.json()));

  const results = await Promise.all(promises); // Parallel Execution

  console.log(results);
}

fetchData();
```

Node.js Parallel Execution এর জন্য Worker Threads, Child Processes, Cluster module রয়েছে।

## Section 14: High Concurrency Control

High Concurrency মানে হচ্ছে, যখন একাধিক user কিংবা একাধিক process একই সময়/একই মুহূর্তে একটি নির্দিষ্ট রিসোর্স কিংবা একটি নির্দিষ্ট ডাটা modify করতে যায়। এর দ্বারা অনেক সমস্যা সৃষ্টি হতে পারে, যার মধ্যে সবচেয়ে গুরুত্বপূর্ণ সমস্যা হচ্ছে Data Inconsistency।

(চলমান)

## Section 15: Functional and Non Functional Requirements

### Functional Requirements

একটি সিস্টেম কি কি কাজ করে সেটি Functional Requirement উল্লেখ করে থাকে। উদাহরণ বলা যায়, সোশ্যাল মিডিয়া সিস্টেমে,

- পোস্ট করা যায়
- পোস্টে লাইক করা যায়
- পোস্টে কমেন্ট করা যায়
- পোস্টে ডিলিট করা যায়

প্রতিটা হচ্ছে এক একটি Functional Requirement।

### Non Functional Requirements

এটি মূলত একটি সিস্টেমের গুণমান বৈশিষ্ট্যতা (Quality Characteristics), উদাহরণ:

- Performance
- Security
- Cost
- Scalability
- Reliability

প্রতিটা হচ্ছে এক একটি Non Functional Requirement।

## Section 16: Back Of the Envelope Estimation

এটি একটি টেকনিক যা আমাদেরকে সিস্টেম ডিজাইন এর Load Balancer, CDN ইত্যাদি ব্যবহার করবো কি না তার আনুমানিক ধারনা হিসাব করে বলে দিতে পারে।

🔗 **আরও পড়ুন: ব্যাক অফ দা এনভেলপ এস্টিমেশন**
## Find Back of the Envelop Estimation

Back of the Envelop Estimation বের করতে আমাদের একটি Cheat Sheet মনে রাখতে হবে,

- 3 zeros = thousand traffic (KB)
- 6 zeros = million traffic (MB)
- 9 zeros = billion traffic (GB)
- 12 zeros = trillion traffic (TB)

x Million users \* y KB = xy GB

উপরের ফর্মুলা ব্যবহার করে আমরা কিছু Estimations বের করতে পারি,

**আমরা এখন ফেইসবুক এর Storage Capacity Estimation বের করতে পারি।**

ধরি ফেসবুক এর DAU(Daily Active User) ১০ Billion।

Daily Active User যদি গড় ১ টি করে post করে তাহলে প্রতিটি post ধরে নি 1kb

উপরের চার্ট অনুযায়ী billion এর ৯ টি zeros আর kb এর ৩ টি zeros মোট ৯ + ৩ = ১২, ১২ টি zeros মানে trillion আর ১০ \* ১ মানে ১০। 

(10 Billion \* 1 kb) = 10 trillion

storage এর পরিমান দাঁড়ায় ১০ trillion।

**আমরা এখন ফেইসবুক এর Traffic Estimation বের করতে পারি।**

প্রতিটি user গড় ৪ টি করে read অপারেশন এবং ২ টি করে write অপারেশন করছে।

(10 Billion \* 6 queries) / 86400 = ~700000

প্রতি সেকেন্ডে ফেইসবুককে গড় ৭০০০০০ রিকোয়েস্ট প্রসেস করতে হচ্ছে।


## Section 17: Authentication and Authorization

একটি secured সিস্টেম design করতে হলে Authentication এবং Authorization জানা অত্যন্ত গুরুত্বপূর্ণ। Authentication মূলত identity verify করাকে বুজায়। আমরা যখন কোনো সিস্টেমে গিয়ে ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করার চেষ্টা করি, সেই ইমেইল আর পাসওয়ার্ড ভেরিফাই করে হচ্ছে Authentication।

Authorization হলো কোনো নির্দিষ্ট রিসোর্সে নির্দিষ্ট user এক্সেস করতে পারবে কি না তা বুঝায়। যেমন কোনো এপ্লিকেশন এ নির্দিষ্ট API থাকে যা শুধুমাত্ৰ এডমিনিস্ট্রেটর মানুষ ছাড়া ব্যবহার করতে পারবে না, এখন যদি কেউ এক্সেস করতে চায় তাহলে সেই মানুষটা Authorize আছে কি না সেটাই যাচাই করা হচ্ছে Authorization।

🔗 **আরও পড়ুন: অথেনটিকেশন এবং অথরিজাশন**
## Session based Authentication এবং Token based Authentication

এই দুই Authentication টেকনিক আমাদের নিজেদের জানা অত্যন্ত গুরুত্বপূর্ণ।

### Session based Authentication

এক্ষেত্রে Authentication করার সময় session ইনফরমেশন/তথ্য ডাটাবেসে কিংবা Session Store এ রাখা হয়। কিভাবে কাজ করে?

- ফ্রন্টএন্ড থেকে ব্যাকএন্ড এ user লগইন রিকোয়েস্ট করবে।
- username কিংবা email এবং password যখন সঠিক হবে, সার্ভার তখন Session তৈরী করে থাকে একটি নির্দিষ্ট Secret Key এর মাধ্যমে। তারপর সেই Session কোনো ডাটাবেস টেবিলে কিংবা Session Store এ স্টোর করে রেখে দেয়।
- তারপর সার্ভার একটি unique Session ID সম্বলিত cookie ক্লায়েন্ট এর কাছে পাঠাবে।
- পরবর্তী সময় ক্লায়েন্ট যখন কোনো প্রোটেক্টেড রিসোর্স এর জন্য সার্ভারের কাছে রিকোয়েস্ট পাঠাবে, তখন সার্ভার সেই রিকোয়েস্ট এর মধ্যে থাকা Session ID কে যাচাই করবে(তা হতে পারে কোনো ডাটাবেস টেবিল থেকে কিংবা কোনো Session Store থেকে)।

যেহেতু Session কোনো স্থানে স্টোর করে রাখা হয় সেজন্য Session based Authentication কে Stateful বলা হয়।

### Token based Authentication

এক্ষেত্রে Authentication করার সময় session ইনফরমেশন/তথ্য ডাটাবেসে কিংবা Session Store এ রাখা হয় না। কিভাবে কাজ করে?

- ফ্রন্টএন্ড থেকে ব্যাকএন্ড এ user লগইন রিকোয়েস্ট করবে।
- username কিংবা email এবং password যখন সঠিক হবে, সার্ভার তখন Private Key এর মাধ্যমে একটি Token তৈরী করবে। Token টি কে সাধারণত JSON Web Token বলে। এটি মূলত একটি Signed Token মানে এতে অনেক ইনফরমেশন থাকে এক প্রকারের এনক্রিপ্ট অবস্থায়।
- তারপর সার্ভার JWT সম্বলিত cookie ক্লায়েন্ট এর কাছে পাঠাবে।
- পরবর্তী সময় ক্লায়েন্ট যখন কোনো প্রোটেক্টেড রিসোর্স এর জন্য সার্ভারের কাছে রিকোয়েস্ট পাঠাবে, তখন সার্ভার সেই রিকোয়েস্ট এর মধ্যে থাকা JWT কে যাচাই করবে সেই Private Key এর মাধ্যমে।

যেহেতু Session কোনো স্থানে স্টোর করে রাখা হয় না সেজন্য Token based Authentication কে Stateless বলা হয়।

## কখন Session based Authentication/Token based Authentication ব্যবহার করব?

- যে সিস্টেমে user ট্র্যাক করার প্রয়োজন হয় সেখানে Session based Authentication ব্যবহার করবো।
- সিষ্টেম যদি sensitive data হ্যান্ডেল করে থাকে তাহলে Session based authentication ব্যবহার করা যায়।
- অন্যান্য ক্ষেত্রে Token based authentication ব্যবহার করা যায়।


## Section 18: Stateful and Stateless Architecture

### Stateful

এই আর্কিটেকচারে ডেটা Store এবং Maintain Application সার্ভারে হয়ে থাকে। FTTP হল Stateful।

বাস্তব জীবনে Stateful আর্কিটেকচার এর উদাহরণ হল Web Socket। Web Socket মূলত bidirectional, full-duplex protocol। এখানে Server ডেটা store করে রাখে, যাতে Client সবসময় Server থেকে ডেটা পায়।

### Stateless

এই আর্কিটেকচারে ডেটা Store এবং Maintain Application সার্ভারে হয় না বরং কোনো Database বা Cache এ স্টোর এবং মেইনটেইন হয়। HTTP হল Stateless।

HTTP সবসময় Stateless Architecture, কারণ কোনো protected resource এর জন্য আপনাকে সবসময় request করার সময় cookie/token সাথে দিতে হয়। server কখনো cookie/token স্টোর করে রাখে না।

🔗 **আরও পড়ুন: স্টেটলেস-স্টেটফুল আর্কিটেকচার**
## High Traffic in a Stateful Architecture

আমরা জানি Stateful Archtecture ডেটা সার্ভার স্টোর করে রাখে। এখন যদি request এর পরিমাণ বেশি হয় তখন কোনো এক কারণে সার্ভারে কোনো ত্রুটি হওয়ার ফলে ডেটা নষ্ট হয়ে যেতে পারে, তখন ডেটা recover করার সুযোগ থাকে না।

<p align="center">
  <img src="sections/stateless-stateful-architecture/images/stateful-1.png" alt="Stateful pic">
</p>

ডেটা নষ্ট হওয়ার আগে।

<p align="center">
  <img src="sections/stateless-stateful-architecture/images/stateful-2.png" alt="Stateful pic">
</p>

অতিরিক্ত Client Request এর ফলে Client 1 এর Data নষ্ট হওয়ার পর, সার্ভারে Client 1 এর ডেটা আর নাই।

## Scalability - Stateful এবং Stateless Architecture

উপরের যে issue নিয়ে বলা হলো তা Stateful Architecture এ হয়ে থাকে। একই issue Stateless Architecture যেরকম কাজ করে,

<p align="center">
  <img src="sections/stateless-stateful-architecture/images/stateless-1.png" alt="Stateless pic">
</p>

একাধিক user সার্ভারে call দেয়া শুরু করলো, আমাদের সার্ভারের রিসোর্স কম সেজন্য আমাদের সার্ভার একটি সময় ক্র্যাশ করবে। এই সমস্যা সমাধানের জন্য আমরা Load Balancer দিয়ে Horizontal Scaling ব্যবহার করতে পারি।

<p align="center">
  <img src="sections/stateless-stateful-architecture/images/stateless-2.png" alt="Stateless pic">
</p>

যেহেতু Stateless Architecture এ সার্ভারের মধ্যে কোনো প্রকারের ডেটা কিংবা ইনফরমেশন সংরক্ষন হচ্ছে না, সেহেতু ক্লায়েন্ট যেকোন সার্ভার থেকে ডেটা পেলেই হবে। এরকম আমরা Stateless Architecture এ খুব সহজে Scale করতে পারি।

একই সমস্যা আমরা Stateful Architecture এ একইভাবে সমাধান করতে পারবো না, কারণ এই Architecture এ সার্ভারের ভিতর ক্লায়েন্টের ইনফরমেশন/ডেটা সংরক্ষন থাকে। তাহলে কিভাবে সমাধান করবো?

## কিভাবে Stateful আর্কিটেকচার কে scale করা যায়?

এই সমস্যা সমাধানের জন্য আমাদের কাছে দুটি options আছে। Message Queue এবং Pub-Sub।

Pub-sub দিয়ে যদি আমরা সমাধান করি, তাহলে প্রথমে আমাদের বুজতে হবে pub-sub কি। Pub-sub মানে হলো Publish and Subscribe pattern। Publisher ডেটা পাঠাবে এবং সেই ডেটা বিভিন্ন সাবস্ক্রাইবার যে সাবস্ক্রাইব করে রাখবে তাদের কাছে চলে যাবে। Redis ভালোভাবে Publish and Subscribe pattern provide করে থাকে।

<p align="center">
  <img src="sections/stateless-stateful-architecture/images/stateful-3.png" alt="Stateful pic">
</p>

উপরের ছবি অনুযায়ী আমরা ধরে রাখি user 1 এর ইনফরমেশন সার্ভার 1 এর কাছে রয়েছে, user 2 এর ইনফরমেশন সার্ভার 2 এর কাছে এবং user 3 এর ইনফরমেশন সার্ভার 3 এ রয়েছে। user 1 যখন ডেটা সার্ভার 1 এ পাঠাবে তখন সার্ভার 1, publisher মানে redis এ সেই ডেটা publish করবে, এখন redis publisher এ যদি সার্ভার 2 এবং 3 subscribe করে রাখে তাহলে এরাও সেই ডেটা পেয়ে যাবে। তারপর সার্ভার 2 এবং ৩, user 2 এবং 3 এর মধ্যে ডেটা পাঠিয়ে দিবে।

এরকম আমরা Stateful Architecture স্কেল করতে পারি।

## কেনো TCP স্টেটফুল এবং HTTP স্টেটলেস?

একজন ইঞ্জিনিয়ার হিসেবে TCP কেন Stateful এবং HTTP কেন Stateless এটি জানা অত্যন্ত গুরুত্বপূর্ণ। TCP হলো Transmission প্রোটোকল এবং HTTP হলো (Hyper)Text Transfer প্রোটোকল।

TCP তে একটি host যখন অন্য host এর সাথে কানেকশন তৈরী হয় তখন host'গুলোর বর্তমান অবস্থা অর্থাৎ এদের sequence number, এদের ভিতরের acknowledgment ট্র্যাক করে রাখা হয়। এজন্য TCP Stateful।

HTTP Stateless কারণ প্রতিটা রিকোয়েস্ট তার পূর্বের রিকোয়েস্ট থেকে ভিন্ন। এখানে যেহেতু প্রতিটা রিকোয়েস্টগুলোর তথ্য সংরক্ষন করে রাখা হচ্ছে না, সেহেতু HTTP Stateless।

## গুরুত্বপূর্ণ প্রশ্নগুলো

- Stateless আর্কিটেকচার এর সুবিধাগুলো কি কি?
- Stateful আর্কিটেকচার এর সুবিধাগুলো কি কি?
- আপনি যদি একজন user লগইন অবস্থায় আছে কি না তা ট্র্যাক করতে চান তাহলে আপনি কোনো আর্কিটেকচার এবং কেনো ব্যবহার করবেন?
- কেনো TCP Stateful এবং HTTP Stateless?
- WebSocket কেনো Stateful?


## Section 19: Proxy

ক্লায়েন্ট যখন সার্ভারকে রিকুয়েস্ট পাঠানোর সময় সরাসরি সার্ভারকে রিকুয়েস্ট না করে অন্য একটি সার্ভাররের মাধ্যমে রিকুয়েস্ট করলে, সেই প্রসেস হচ্ছে প্রক্সি এবং যে সার্ভার দিয়ে রিকুয়েস্ট করবে সেটা হচ্ছে প্রক্সি সার্ভার।

বাস্তব জীবনে প্রক্সির একটি উদাহরণ হচ্ছে NGINX।

🔗 **আরও পড়ুন: প্রক্সি**
## Forward Proxy এবং Reverse Proxy

প্রক্সি কে ২ ভাগে ভাগ করা যায়, ফরওয়ার্ড প্রক্সি এবং রিভার্স প্রক্সি।

ফরওয়ার্ড প্রক্সি হল, এক বা একাধিক ক্লায়েন্ট যখন ইন্টারনেট সার্ভারে সরাসরি রিকুয়েস্ট না করে একটি প্রক্সি সার্ভারে রিকুয়েস্ট করবে এবং সেই প্রক্সি সার্ভার সরাসরি ইন্টারনেটের মাধ্যমে সার্ভারকে রিকুয়েস্ট করবে। ফরওয়ার্ড প্রক্সি-তে সার্ভার জানবে না কোন ক্লায়েন্ট তাকে রিকুয়েস্টটি দিয়েছে।

<p align="center">
  <img src="sections/proxy/images/forward-proxy.png" alt="Forward Proxy">
</p>

ফরওয়ার্ড প্রক্সির ব্যবহার করার সুবিধা হল,

- কিছু স্পেসিফিক সাইট ব্লক করা যেতে পারে, যাতে করে ক্লায়েন্ট এক্সেস করতে না পারে।
- Caching এর জন্য ফরওয়ার্ড প্রক্সি ব্যবহার করা যায়।

রিভার্স প্রক্সি হল, ক্লায়েন্ট ইন্টারনেটের মাধ্যমে প্রক্সি সার্ভারে রিকুয়েস্ট করবে এবং সেই প্রক্সি সার্ভার বলে দিবে এক বা একাধিক সার্ভারের মধ্যে কোন সার্ভার রিকুয়েস্ট টা নিবে, যার ফলে ক্লায়েন্ট কখোনই জানতে পারবে না কোন সার্ভার তাকে রিকুয়েস্টটি নিয়েছে।

<p align="center">
  <img src="sections/proxy/images/reverse-proxy.png" alt="Reverse Proxy">
</p>

রিভার্স প্রক্সির ব্যবহার করার সুবিধা হল,

- Load Distribution: Reverse proxy সবসময় client থেকে আসা request গুলোকে multiple backend server এর মধ্যে distribute করে।
- High Availability: Multiple সার্ভার থাকার ফলে Distribution করার মাধ্যমে আমরা High Availability নিশ্চিত করতে পারি।
- Security: Reverse Proxy তে যখন রেসপন্স ক্লায়েন্ট কে দেয়া হয় তখন সার্ভারের ইনফরমেশন/ip সাথে করে দেয়া হয় না সেজন্য সার্ভার secured থাকে।
- SSL/TLS Encryption and Decryption: Reverse Proxy SSL/TLS Encryption এবং Decryption করে থাকে।

### Load Balancing

আমরা যদি প্রাক্টিকালি বলতে যাই, লোড ব্যালেন্সিং একটি টেকনিক যা আমাদের ক্লায়েন্ট রিকুয়েস্টগুলোকে একাধিক সার্ভারের মধ্য থেকে এক একটি সার্ভারে ডিসট্রিবিউট করতে পারে। উদাহরণ হল, NGINX।

### কেন Load Balancing

ধরুন আমাদের একটি ওয়েবসাইট আছে, যেখানে ইউজাররা ভালোভাবে ব্যবহার করতে পারছে,

<p align="center">
  <img src="sections/proxy/images/lb-1.png" alt="Load Balancing">
</p>

এখন আমাদের ওয়েবসাইটে কোন একসময় প্রচুর ইউজার ব্যবহার করা শুরু করল,

<p align="center">
  <img src="sections/proxy/images/lb-2.png" alt="Load Balancing">
</p>

এত সংখ্যক ইউজারের লোড সহ্য করতে না পেরে সার্ভার ক্রাশ করতে পারে। এই প্রবলেম সমাধানের জন্য লোড ব্যালেন্সিং করা হয়।

লোড ব্যালেন্সিং হল ইউজারের রিকুয়েস্টকে ওয়েবসাইটের একাধিক সার্ভারের মধ্যে যেকোন একটিতে ডিসট্রিবিউট করা।

<p align="center">
  <img src="sections/proxy/images/lb-3.png" alt="Load Balancing">
</p>

এতেকরে আমরা অত্যাধিক ইউজারের লোড নিয়ন্ত্রণ করতে পারি, এবং আমাদের সাইট ক্রাশ হওয়ার সম্ভাবনা কমে যায়।

Load Balancer সাধারণত ৩টি পদ্ধতিতে মেনে চলে লোড ডিসট্রিবিউট করতে পারে, রাউন্ড রবিন, লোড বেইজড ডিসট্রিবিউশন এবং রিসোর্স বেইজড ডিসট্রিবিউশন।

### Load Balancer এর সুবিধাগুলো

লোড ব্যালেন্সার ব্যবহারের সুবিধা হল,

- স্কেলেবিলিটি (Scalability), লোড ব্যালেন্সার হরাইজন্টাল স্কেলিং পদ্ধতি ব্যবহার করে আমাদের ওয়েবসাইটকে স্কেল করে থাকে।
- এভাইল্যাবিলিটি (Availability), কোন সার্ভার যদি কোন কারণে নষ্ট হয়ে যায় লোড ব্যালেন্সারের সেই রিকুয়েস্টকে অন্য সার্ভারে ট্রান্সফার করতে পারবে।

### রিভার্স প্রক্সি হিসেবে NGINX

NGINX একটি জনপ্রিয় রিভার্স প্রক্সি। এর মত আরো কিছু রিভার্স প্রক্সি রয়েছে। সাধারণত NGINX রিকোয়েস্টকে একাধিক সার্ভার এর মধ্য থেকে একটি সার্ভারে ফরওয়ার্ড করে দেয়, প্রসেসিং এর জন্য।

NGINX এর কনফিগারেশন ফাইল সাধারণত এরকম থাকে।

```nginx
worker_processes 1;  # Number of worker processes
events {
  worker_connections 1024;  # Maximum number of simultaneous connections per worker
}

http {
  include       mime.types;  # Include MIME types
  default_type  application/octet-stream;  # Default MIME type

  sendfile          on;  # Enable efficient file transfers
  keepalive_timeout 65;  # Timeout for persistent connections

  server {
    listen 80;  # Listen on port 80 (HTTP)
    server_name example.com www.example.com;  # Your domain names

    location / {
      root /var/www/html;  # Root directory for your files
      index index.html;  # Default file to serve
    }

    error_page 404 /404.html;  # Custom error page
  }
}
```

এখানে / সংযুক্ত রিকোয়েস্টগুলোকে /var/www/html ডিরেক্টরির index.html ফাইল দেখাবে।

এখন আপনি যদি Node.js NGINX দ্বারা পয়েন্ট করে দিতে চান,

```nginx
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name  localhost;

  # Load configuration files for the default server block.
  include /etc/nginx/default.d/*.conf;

  location /api/ {
    proxy_pass http://localhost:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

উপরের server ব্লক এর মধ্যে দেখা যাচ্ছে, রিকোয়েস্ট এর মধ্যে /api থাকলে তা আমাদের node.js ইনস্ট্যান্স কে হিট করবে, যার পোর্ট হচ্ছে 4000।

আমরা চাইলে NGINX এর Load Balancing এর সুবিধা নিতে পারবো, যদি আমরা Performance, Reliability এবং Scalability চিন্তা করি।

NGINX Load Balancer ব্যবহারের সর্বোত্তম সময় আমাদের consider করতে হবে,

- যখন দেখবো আমাদের সিস্টেম ট্রাফিক রিকোয়েস্ট হ্যান্ডেল করতে scalability প্রয়োজন।
- আমাদের সিস্টেমে Downtime কমানোর প্রয়োজন।
- যখন আমরা Distributed System তৈরী করবো।

এসব ক্ষেত্রে লোড ব্যালেন্সিং করবো।

উপরের NGINX কোড কে লোড ব্যালেন্সিং করলে,

```nginx
http {
  upstream backend_servers {
    # Define the backend servers
    server 127.0.0.1:4000;  # Primary backend server
    server 127.0.0.1:4001;  # Secondary backend server
    server 127.0.0.1:4002;  # Tertiary backend server
  }

  server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name localhost;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location /api/ {
      proxy_pass http://backend_servers;  # Pass requests to the load balancer
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;

      # Additional settings for proxying
      proxy_connect_timeout 60s;
      proxy_read_timeout 60s;
      proxy_send_timeout 60s;
    }
  }
}
```

### কিভাবে রিভার্স প্রক্সিতে HTTPS কাজ করে?

যখন প্রক্সি সার্ভার(NGINX) HTTPS রিকোয়েস্ট পেয়ে থাকে তখন ২টি ধাপ প্রসেস হয়।

- SSL/TLS Handshake ধাপ
- Request Processing ধাপ

#### SSL/TLS Handshake ধাপ

যখন ক্লায়েন্ট এর কাছে থেকে https রিকোয়েস্ট পায়, তখন

- Client Hello: ক্লায়েন্ট TLS ভার্সন এবং Cipher Suites প্রেরণ করে।
- Server Hello: NGINX তার Cipher Suite এবং TLS ভার্সন ক্লায়েন্টকে পাঠিয়ে দেয়।
- Certificate Exchange: NGINX তার SSL সার্টিফিকেট, ক্লায়েন্টকে প্রেরণ করে।
- Key Exchange: ক্লায়েন্ট সার্টিফিকেট যাচাই করে এবং একটি Session key তৈরী করে।
- Session Established: সুরক্ষিত communication শুরু।

(Cipher Suites কী? এটি এক বা একাধিক Alogirithm এর সমষ্টি যা সুরক্ষিত নেটওয়ার্ক connection তৈরী করতে সাহায্য করে থাকে। এতে মূলত encryption, authentication এবং key exchange method গুলো উল্লেখ থাকে।)

#### Request Processing ধাপ

সুরক্ষিত communication শুরু হওয়ার পরে,

- Request Decryption: Nginx HTTPS রিকোয়েস্টকে সেই session key ডিক্ৰিপ্ট করে।
- Request Processing: ডিক্ৰিপ্ট করা HTTP রিকোয়েস্টকে প্রসেস করে।
- Response Encryption: রেসপন্স এনক্রিপ্ট করে ক্লায়েন্ট এর কাছে পাঠিয়ে দেয়।

দুটি ধাপ(SSL/TLS Handshake, Request Processing) control করার জন্য NGINX এর কনফিগারেশন থাকে,

```nginx
server {
  listen 443 ssl; # Enables HTTPS on port 443
  server_name example.com;
  ssl_certificate /etc/nginx/ssl/example.crt;
  ssl_certificate_key /etc/nginx/ssl/example.key;

  location / {
    proxy_pass http://backend_server;
  }
}
```

এখানে ssl_certificate এবং ssl_certificate_key মূলত SSL/TLS Handshake এর অংশ। অন্যদিকে location এবং proxy_pass, Request Processing এর অংশ।

### NGINX Load Balancer এবং AWS Elastic Load Balancer

NGINX Load Balancer মূলত একাধিক ইনকামিং রিকোয়েস্টগুলোকে একাধিক সার্ভারের মধ্য থেকে এক একটি সার্ভারে ডিস্ট্রিবিউট করে দেয়।

<p align="center">
  <img src="sections/proxy/images/nginx_lb.png" alt="Load Balancing">
</p>

AWS ELB মূলত ইনকামিং ট্রাফিকগুলোকে এক একটি নির্দিষ্ট টার্গেট এর মধ্যে ডিস্ট্রিবিউট করে। এখানে টার্গেট হতে পারে EC2 Instance।

<p align="center">
  <img src="sections/proxy/images/aws_elb.png" alt="Load Balancing">
</p>

দুটির মধ্যে তফাৎ NGINX Load Balancer সরাসরি এপ্লিকেশন লেভেল এর মধ্যে ডিস্ট্রিবিউট করে আর AWS ELB ইনস্ট্যান্স লেভেল এর ডিস্ট্রিবিউট করে। আমরা আমাদের সিস্টেমের Availability জন্য দুটোই ব্যবহার করতে পারি।

### Node.js-এর সাথে NGINX রিভার্স প্রক্সি হিসেবে ব্যবহার করার কারণ কী?

Node.js দিয়ে Web Server তৈরী করা যায় এবং NGINX নিজেই Web Server।

- Node js মূলত আমাদের জাভাস্ক্রিপ্ট কোডকে ব্রাউসার এর বাহিরে চালাতে সাহায্য করে, অন্যদিকে NGINX static content(যেমন HTML, CSS, JavaScript) সার্ভ করে থাকে।

- NGINX Reverse Proxy হিসেবে কাজ করতে পারে। এটি ট্রাফিক ফ্লো কে একাধিক নোড জেএস ইনস্ট্যান্স এ ডিস্ট্রিবিউট করতে পারে।

- NGINX বিভিন্ন ডোমেইন ও সাবডোমেইন (যেমন, app.example.com) পরিচালনা করতে পারে। এগুলোর জন্য নোড জেএস ফ্লেক্সিবল না।

এগুলো থেকে বুঝা যায় নোড জেএস General-Purpose Web Server না। এজন্য নোড জেএস এর সাথে General-Purpose Web Server হিসেবে NGINX ব্যবহার করা হয়।


## Section 20: REST Api

REST Api জানার পূর্বে আমাদের বুঝতে হবে রেস্ট(REST) মানে কি, REST মানে হল Representational State Transfer যার মানে দাড়ায় এটি একটি আর্কিটেকচারাল স্টাইল যা ব্যবহার করা হয় স্টেট ট্রান্সফার এর জন্য। এখন REST Api হল, এক প্রকারের এপিআই কনভেনশন যা ব্যবহার করা হয় দুটি এন্ড(যেমনঃ ক্লায়েন্ট এবং সার্ভার) এর মধ্যে স্টেট ট্রান্সফার করাকে নিশ্চিত করার জন্য।

স্টেট ট্রান্সফার নিশ্চিত করতে কিছু স্পেসিফিক HTTP Methods ব্যবহার করা হয়, GET, POST, PUT, PATCH & DELETE, প্রতিটি ম্যাথোডের ব্যবহার জানতে REST Api সেকশনে ক্লিক করুন।

🔗 **আরও পড়ুন: রেস্ট এপিআই**
## Principal of REST API

### Client এবং Server পৃথক

REST Architecture এর প্রধান Principal হল Client এবং Server পৃথক থাকতে হবে। Client শুধু Request করবে এবং Server Response দিবে। User Interface এবং Data Storage পৃথক থাকবে।

### Stateless

প্রতিটি Api এর Request এবং Response পূর্বের এবং পরবর্তী Request এবং Response উপর কোনো নির্ভর করবে না।

### Cacheable

Stateless হওয়ার পরেও আমরা Request এবং Response কে Cache করতে পারব।

REST Api মূলত ৫'টি প্রধান HTTP Methods দ্বারা স্টেট ট্রান্সফার নিশ্চিত করে থাকে।

## GET

GET ম্যাথোড ব্যবহারের মাধ্যমে ক্লায়েন্ট কিছু স্পেসিফিক রির্সোস এর জন্য সার্ভারকে রিকুয়েস্ট করতে পারবে।

যেমন, ক্লায়েন্ট ইউজারদের লিস্ট এর জন্য রিকুয়েস্ট করতে পারে,

<p align="center">
  <img src="sections/rest-api/images/get.png" alt="GET request">
</p>

## POST

POST ম্যাথোড ব্যবহার করা হয় নতুন রিসোর্স তৈরি করার লক্ষ্যে, ক্লায়েন্ট সার্ভারকে রিকুয়েস্ট করতে পারে।

যেমন, ক্লায়েন্ট নতুন ইউজার তৈরি করতে সার্ভারকে POST রিকুয়েস্টের মাধ্যমে রিকুয়েস্ট করতে পারে,

<p align="center">
  <img src="sections/rest-api/images/post.png" alt="POST request">
</p>

## PUT

PUT ম্যাথোড ব্যবহার করা হয় নতুন রিসোর্স তৈরি করার লক্ষ্যে কিংবা কোন স্পেসিফিক রিসোর্সকে পরিবর্তন করতে।

যেমন, ক্লায়েন্ট সার্ভারকে রিকুয়েস্ট করতে পারে কোন ইউজারের নাম পরিবর্তন করতে,

<p align="center">
  <img src="sections/rest-api/images/put.png" alt="PUT request">
</p>

## PATCH

PATCH ম্যাথোড ব্যবহার করা হয় কোন স্পেসিফিক রিসোর্সের স্পেসিফিক ভ্যালু পরিবর্তন করতে।

যেমন, ক্লায়েন্ট সার্ভারকে রিকুয়েস্ট করতে পারে কোন ইউজারের শুধু ইমেইল পরিবর্তন করতে,

<p align="center">
  <img src="sections/rest-api/images/patch.png" alt="PATCH request">
</p>

## DELETE

DELETE ম্যাথোড ব্যবহার করা হয় কোন স্পেসিফিক রিসোর্স ডিলিট করতে।

যেমন, ক্লায়েন্ট সার্ভারকে রিকুয়েস্ট করতে পারে কোন স্পেসিফিক ইউজার ডিলিট করতে যার নাম হবে John,

<p align="center">
  <img src="sections/rest-api/images/delete.png" alt="DELETE request">
</p>

## POST এবং PUT এর মধ্যে পার্থক্য

POST এবং PUT এর মধ্যে পার্থক্য হল, POST সবসময় নতুন রিসোর্স তৈরি করে থাকে যেখানে PUT হল idempotent মানে রিসোর্স যদি ইতিমধ্যে থাকে তাহলে সে আর নতুন রিসোর্স তৈরি করবে না।

## PUT এবং PATCH এর মধ্যে পার্থক্য

PUT এবং PATCH এর মধ্যে পার্থক্য হল, PUT এর ক্ষেত্রে ক্লায়েন্ট একটি স্পেসিফিক ডাটার কিছু পরিবর্তন করতে চাইলে তাকে সেই ডাটার সম্পূর্ণ Attributes সার্ভারকে দিতে হবে এবং PATCH এর ক্ষেত্রে ক্লায়েন্ট সেই ডাটার যে Attribute পরিবর্তন হবে সেই Attribute টাই শুধু সার্ভারকে দিতে হবে।

## HTTP Headers

REST API তে Client এবং Server একে অপরের মধ্যে কিছু অতিরিক্ত তথ্য আদান-প্রধান করতে পারে তা করা হয় HTTP Headers ব্যবহার করে।

HTTP Headers কে ৪ category তে ভাগ করা হয়,

- Request headers: Client থেকে Server
- Response headers: Server থেকে Client
- Representation headers: Information about the body of the resource.
- Payload headers: Information about the payload data.

## REST API best practices

- JSON format ব্যবহার করা রিকুয়েস্ট এবং রেসপন্সের পাঠানোর সময়। উদাহরণ,

```js
router.get("/users", (req, res) => {
  res.status(200).json(users); // response format is JSON
});
```

- Noun ব্যবহার করা, verb এর পরিবর্তে। উদাহরণ,

```txt
--- recommanded ---
'/users'
'/users/{id}'
'/products'

--- not recommanded ---
'/get-users'
'/get-user'
'/fetch-products'
```

- Filtering, Sorting এর জন্য Query Params ব্যবহার করা। উদাহরণ,

{api_endpoint}/posts?tags=react

? এর পরের অংশটুকু হল Query Parameters.

- Health check endpoint তৈরী করে রাখা। উদাহরণ, /health - যা বলে দিবে সার্ভিস healthy আছে কি না।

- ISO 8601 UTC dates ব্যবহার করা। যখন আমরা Time এবং Date নিয়ে কাজ করবো তখন ISO 8601 UTC dates আকারে সার্ভার থেকে ক্লায়েন্টের কাছে পাঠিয়ে দিবো। নির্দিষ্ট time-zone এ দেখানো তা ক্লায়েন্ট সাইড এর বিষয়।

- নির্দিষ্ট রেস্পন্সের জন্য নির্দিষ্ট Status Code ব্যবহার করা।

## Rest API security best practices

- HTTPS ব্যবহার করা।
- properly Authorization implement করা।
- Rate Limiter ব্যবহার করা।
- User এর দেয়া Input, Validate করা।
- OWASP API Security Risks নিয়ে সাবধান থাকা।

## Rest API performance best practices

### Caching

<a href="https://github.com/lahin31/system-design-bangla#section-19-caching">Caching নিয়ে আমার লিখা পড়তে পারেন</a>

### CDN

<a href="https://github.com/lahin31/system-design-bangla#section-20-content-delivery-network">Caching নিয়ে আমার লিখা পড়তে পারেন</a>

### Pagination

২ রকমের pagination techniques আমাদের কাছে আছে। Offset এবং Cursor। আমাদের requirements এর উপর ভিত্তি করে আমরা pagination technique ব্যবহার করব।

### Data Compression

Data Compressed করলে আমরা API response এর size কমাতে পারবো।

### Unnecessary property send to payload and response

Payload এবং Response এর মধ্যে অপ্রয়োজনীয় প্রপার্টি(object, array) পাঠাবো না।

## HTTP Status Code

HTTP Status Code আমাদেরকে বলে দেয় একটি নির্দিষ্ট HTTP Method(GET, POST, PUT) এর রিকুয়েস্ট সাকসেসফুল হয়েছে কি না।

এটি ব্যবহার করা একটি উওম প্রাকটিস বলে গণ্য করা হয়।

HTTP Status Code কে পাঁচ শ্রেণিতে ভাগ করা হয়,

- Informational Responses(100-199)
- Successfull Responses(200-299)
- Redirects(300-399)
- Client Errors(400-499)
- Server Errors(500-599)

নিচে কিছু HTTP Status Code এর নির্দিষ্ট ব্যবহার বলা হল,

- 200, মানে হল রিকুয়েস্ট সাকসেস হয়েছে।
- 201, মানে হল রিকুয়েস্ট সাকসেস হয়েছে এবং নতুন রিসোর্স তৈরি হয়েছে। (উদাহরণঃ নতুন ইউজার রেজিস্ট্রেশন)
- 400, মানে হল সার্ভার বুজতে পারছে না client দ্বারা কোন ভুল সিনট্যাক্স বা ভুল তথ্য দেয়ার জন্য।
- 401, হল unauthorized, মানে ক্লায়েন্ট এমন কিছুর জন্য রিকুয়েস্ট করেছে যার জন্য সে authorized না।
- 404, মানে হল সার্ভার রেসপন্সটি খুঁজে পায় নাই।
- 409, মানে request এর মধ্যে কোনো প্রকারের conflict আছে।
- 500, মানে সার্ভার এমন কিছু Error পেয়েছে যা সে জানে না কিভাবে ঠিক করবে।

আরও জানতে এই লিংকে যেতে পারেন, https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## REST API এবং GraphQL এর মধ্যে পার্থক্য

- Data Fetching

  - REST API তে সার্ভার ডিফাইন করে দেয় রেস্পন্সের গঠন।
  - GraphQL এ ক্লায়েন্ট রিকোয়েস্ট এর সাথে বলে দেয় কোন কোন ডেটা ক্লায়েন্ট এর প্রয়োজন, সার্ভার সেই ডেটাগুলো ক্লায়েন্টকে দিয়ে থাকে।

- Over Fetching of data

  - REST API তে যেহেতু সার্ভার রেস্পন্সের গঠন ডিফাইন করে দেয় সেজন্য data overfetching হওয়ার সম্ভাবনা থাকে।
  - GraphQL এ যেহেতু ক্লায়েন্ট রিকোয়েস্ট এর সাথে বলে দেয় কোন কোন ডেটা ক্লায়েন্ট এর প্রয়োজন, সেজন্য data overfetching হওয়ার সম্ভাবনা থাকে না।

- Error Handling

  - REST API হল Weakly Typed যার মানে যেসব ডেটা ক্লায়েন্ট এবং সার্ভার একে অপরের মধ্যে আদান-প্রদান করবে সেগুলোর টাইপ well-defined এবং validated হতে হবে না।
  - GraphQL হল Strongly Typed মানে ডেটার স্ট্রাকচার এবং যেসব ডেটা রিকোয়েস্ট করা হচ্ছে সেগুলোর টাইপ well-defined এবং validated থাকতে হবে।

## Idempotent API

যেসব API এমন কোনো রিসোর্স তৈরী করে না যা ইতিমধ্যে তৈরী হয়ে রয়েছে, সেই API গুলোকে Idempotent API বলে। GET, PUT এবং DELETE এগুলো Idempotent API। আর POST এবং PATCH Idempotent API নয়।

আপনি যখন GET api ব্যবহার করে বার বার কিংবা api retry করে api call করবেন তখন আপনি নির্দিষ্ট রিসোর্স পাবেন, ডেটাবেসে কোনো নতুন রিসোর্স তৈরী হবে না। একই ভাবে PUT এবং DELETE এর ক্ষেত্রেও সমান, ঐখানে নতুন রিসোর্স তৈরী হবে না বরং নির্দিষ্ট রিসোর্স আপডেট এবং ডিলিট হবে। যেখানে POST এবং PATCH সবসময় নতুন রিসোর্স তৈরী করবে।

### কেন এবং কিভাবে API কে Idempotent বানানো যায়?

ধরুন আপনি কোনো কিছুর জন্য Payment করছেন, আপনি Payment button click করার পর আপনার রিকোয়েস্ট সার্ভারে প্রসেস হচ্ছে এখন প্রসেস হওয়ার সময় আপনি কোনোভাবে আবার Payment button click করলেন। এখন সার্ভারের কাছে আপনার দুটি রিকোয়েস্ট আছে, সার্ভার আপনার দুটি payment request প্রসেস করবে। এতে করে আপনার payment একবার এর জায়গায় দুবার (payment) হয়ে গেলো।

এরকম আরো অনেক scenario আছে যেখানে API মানে POST API Idempotent না হওয়ার কারণে আপনার সিস্টেম এর End User এর ক্ষতি হতে পারে।

এই সমস্যার সমাধানের জন্য আমরা একটি পদ্ধতি মেনে চলতে পারি,

- স্টেপ ১: প্রতিটি API রিকোয়েস্ট এ আমরা একটি ইউনিক (UUID/ULID) ভ্যালু HEADER এর সাথে সংযোগ করে দিয়ে দিব।
- স্টেপ ২: প্রথমবার আমরা ডেটাবেসে কিংবা cache এর ভিতর ইউনিক ভ্যালু এর স্টেট processing হিসাবে রেখে দিব।

-------- এতেই প্রথমবারের মত API request তার response পেয়ে যাবে -------

- স্টেপ ৩: পরবর্তী সময়ে API retry এর ফলে যখন আরেকটি API রিকোয়েস্ট আসবে তখন সার্ভার এই(একই) ইউনিক (UUID) ভ্যালু ডেটাবেসে কিংবা cache এর ভিতর চেক করে দেখবে এই ভ্যালুর বর্তমান স্টেট কি।
- স্টেপ ৪: স্টেট যদি consumed কিংবা processing হয়ে থাকে আমরা API রিকোয়েস্ট কে রিটার্ন করে দিব, নতুনভাবে কোনো প্রকারের প্রসেস করা ছাড়া।

বি:দ্র: অনেকের মনে প্রশ্ন আসতে পারে ইউনিক key কোথায় তৈরী করবো? সাধারণত security দিক থেকে চিন্তা করলে ইউনিক key সার্ভার থেকে তৈরী হয়ে আসা ভালো। ক্লায়েন্ট থেকে key তৈরী করলে security concern থেকে যায়।

## গুরুত্বপূর্ণ প্রশ্নগুলো

- কোন প্রকারের প্রোটোকল REST API ব্যবহার করে?
- REST API এর Principal গুলো কি কি?
- POST এবং PUT এর মধ্যে কি কি পার্থক্য?
- PUT এবং PATCH এর মধ্যে কি কি পার্থক্য?
- Idempotent API কি? কিভাবে API কে Idempotent বানানো যায়?
- REST API এর Best Practice গুলো কি কি?
- REST API তে Pagination কিভাবে handle করবেন?
- REST API এর Security Practice গুলো কি কি?
- Over-Fetching এবং Under-Fetching কি?


## Section 21: Scalability

স্কেলেবিলিটি সাধারণত সিস্টেমের ক্ষমতাকে বুঝায় যখন সিস্টেমে ট্রাফিকের পরিমাণ বাড়তে থাকে। উদাহরণ বলা যেতে পারে, একটি ওয়েবসাইটের ডাটাবেসে এখন একটি নির্দিষ্ট পরিমাণ রিকুয়েস্ট করা হচ্ছে কিন্তু আজ থেকে ৫ মাস পর রিকুয়েস্ট ২ গুণ হয়ে গেল তার ঠিক আরও ৫ মাস পর রিকুয়েস্ট ৪ গুণ হয়ে গেল, একটা সময় দেখা যেতে পারে ডাটাবেস সার্ভার এত পরিমাণ রিকুয়েস্ট লোড নিতে পারছে না, এই সমস্যার সমাধানের জন্য স্কেল করাকে স্কেলেবিলিটি বলে।

স্কেলেবিলিটি সাধারণত 2 প্রকারের, ভার্টিকাল স্কেলেবিলিটি (Vertical Scalability) এবং হরাইজন্টাল স্কেলেবিলিটি (Horizontal Scalability)।

🔗 **আরও পড়ুন: স্কেলেবিলিটি**
### Vertical এবং Horizontal Scaling

#### Vertical Scaling

ভার্টিকাল স্কেলিং হল, একটি সার্ভারের রিসোর্স বৃদ্ধি করে স্কেল করা। এখানে রিসোর্স বলতে সার্ভারের Capacity(CPU/RAM/DISK) কে বুঝানো হয়েছে।

ভার্টিকাল স্কেলিং এর উদাহরণ হল MySQL.

<p align="center">
  <img src="sections/scalability/images/vertical-scaling.png" alt="Vertical Scaling">
</p>

#### Horizontal Scaling

হরাইজন্টাল স্কেলিং হল, নতুন সার্ভার যোগ করে স্কেল করা। সার্ভারের Capacity বৃদ্ধি করার পরিবর্তে নতুন সার্ভার যোগ করাই হল হরাইজন্টাল স্কেলিং।

হরাইজন্টাল স্কেলিং এর উদাহরণ হল Cassandra, MongoDB। AWS Lambda হরাইজন্টাল স্কেলিং করে থাকে।

<p align="center">
  <img src="sections/scalability/images/horizontal-scaling.png" alt="Horizontal Scaling">
</p>

Horizontal Scaling ব্যবহার করার সবচেয়ে বড় সুবিধা, <a href="../reliability/README.md" target="_blank">Fault Tolarance</a> and Availability.

Horizontal Scaling এর একটি সম্পূর্ণ উদাহরণ AWS Auto Scale. আপনার যদি একটি EC2 instance server থাকে এবং আপনার সার্ভার প্রচুর Request পেয়ে থাকে তখন AWS Auto Scale নতুন সার্ভার/instance তৈরি করে এবং Horizontal Scale ভিত্তিক কাজ করে।

Real world system এর কথা চিন্তা করলে Horizontal Scaling এরকম হয়,

<p align="center">
  <img src="sections/scalability/images/practical-horizontal-scaling.png" alt="Horizontal Scaling">
</p>

### কখন Scalability নিয়ে চিন্তা করবো?

যখন আপনি কোনো সিস্টেম তৈরী করবেন, তখন প্রথমে আপনার 0(zero) user থাকবে। অর্থাৎ Scalability কোনো issue না।

আপনি 0 user থাকার সময় Scalability(Vertical/Horizontal) নিয়ে কাজ করলে, আপনি এমন একটি problem নিয়ে কাজ করছেন যার কোনো অস্তিত্ব নাই।

Consistent মনিটরিং এর মাধ্যমে আপনি যখন দেখবেন user ট্রাফিক বৃদ্ধি পাচ্ছে তখন Scalability নিয়ে কাজ করা ভালো।


## Section 22: Database Sharding

Database Sharding হল টেবিল থেকে ডেটা পৃথক করা। উদাহরণ বলা যায়, ডাটাবেসের ডেটা/row যদি বাড়তে থাকে এবং এত পরিমাণ ডেটা/row বেড়ে গেল যার ফলে ডাটাবেস টেবিলে আর স্টোর করা যায় না তখন আমরা ডেটাগুলোকে মূল টেবিল থেকে পৃথক করে অন্যান্য shard টেবিলে distribute করে রাখি সেটাই Database Sharding। একাধিক সার্ভার এই ডিস্ট্রিবিউশন হবে।

<p align="center">
  <img src="./images/sharding.png" alt="Sharding">
</p>

🔗 **আরও পড়ুন: ডেটাবেস সাৰ্ডিং**
## Database Sharding এর সুবিধাগুলো

- **improve response time**: ডেটা retrive করা অনেক ফাস্ট হয়ে থাকে। একসাথে লক্ষ্য লক্ষ্য row থেকে ডেটা retrive করতে যত সময় লাগবে, ছোট ছোট সার্ড টেবিল থেকে ডেটা retrive করতে আরো কম সময় লাগবে। এভাবে response time ইম্প্রোভ করা যায়।

- **effective scaling**: মাল্টিপল সার্ড টেবিলে ডিস্ট্রিবিউট করার ফলে scalability ensure হয়ে থাকে।

- **database resiliency**: মাল্টিপল সার্ড টেবিলে ডিস্ট্রিবিউট করার ফলে প্রতিবার যখন একটি সার্ভার(সার্ড) কোন কারনে নষ্ট হয়ে যায়, তখন অন্য সার্ভার(সার্ড) up and running থাকে।

## Sharding Techniques

### Range Based Sharding

Range Based Sharding এ মূলত একটি নির্দিষ্ট রেঞ্জ এর ভিত্তিতে ডেটা বিভিন্ন সার্ড-এ ডিস্ট্রিবিউট হয়ে থাকে।

<p align="center">
  <img src="sections/database-sharding/images/range-based-sharding.png" alt="range based sharding">
</p>

উপরের ছবিতে দেখা যাচ্ছে, রেঞ্জ ১০ থেকে ২০ id একটি সার্ড-এর মধ্যে থাকবে অপর সার্ড-এ ২১ থেকে ৩৫ id পর্যন্ত ডেটা থাকবে।

### Hash Based Sharding

Hash Based Sharding এ মূলত একটি **হ্যাশ ফাংশন** থাকবে যা বলে দিবে কোন row এর ডেটা কোন সার্ড এ যাবে।

<p align="center">
  <img src="sections/database-sharding/images/hash-based-sharding.png" alt="hash based sharding">
</p>

উপরের ছবিতে দেখা যাচ্ছে, হ্যাশ ফাংশন প্রসেস করার পর ১০ এবং ১৫ id সার্ড ১ এ থাকবে। বাকিগুলো সার্ড ২ এ।

### Directory Based Sharding

Directory Based Sharding এ মূলত একটি Lookup table থাকবে যা বলে দিবে কোন row এর ডেটা কোন সার্ড এ যাবে।

<p align="center">
  <img src="sections/database-sharding/images/directory-based-sharding.png" alt="directory based sharding">
</p>

## Sharding in SQL, NoSQL and Cloud

AWS Database Sharding <a href="https://aws.amazon.com/blogs/database/sharding-with-amazon-relational-database-service/" target="_blank">যেভাবে করে</a>

PostgreSQL এ natively Database Sharding সাপোর্ট করে না তবে PostgreSQL 11 Foreign Data Wrappers এর মাধ্যমে আমরা ডাটা বিভিন্ন সার্ভারে ডিস্ট্রিবিউট এবং read করতে পারি।

আমরা Connection Pool এবং Proxy হিসেবে Pgcat ব্যবহার করে আমরা ডেটা বিভিন্ন shard এর মধ্যে ডিস্ট্রিবিউট করতে পারি।

<p align="center">
  <img src="sections/database-sharding/images/sharding-1.png" alt="sharding">
</p>

## কখন সার্ড করবো না?

(চলমান)

## Sharding এবং Partitioning এর পার্থক্য

Sharding মূলত ডাটাবেসের ডেটাগুলোকে একাধিক সার্ভারের ভিতর একাধিক টেবিল এর মধ্যে ডিস্ট্রিবিউট করে থাকে অন্যদিকে Partition একটি সার্ভারের ভিতর একাধিক টেবিল এর মধ্যে ডিস্ট্রিবিউট করে।


## Section 23: Database Replication

Database Replication এক প্রকারের Strategy, যেখানে একটি Master Database এবং একটি কিংবা একাধিক Slave Database থাকবে। Master Database এর মধ্যে Insert, Delete এবং Update এর কাজ হবে এবং Slave Database মধ্যে Master Database এর ডেটাগুলোর Copy থাকবে এবং তার মধ্যে শুধু Read Operation হবে।

<p align="center">
  <img src="./images/DB_replication.png" alt="Database Replication">
</p>

Database Replication, SQL এবং NoSQL দুটি ডেটাবেসে করা যায়।

🔗 **আরও পড়ুন: ডেটাবেস রেপ্লিকেশন**
## Replication Lag

সর্বমোট যত সময় Master Database এর update কিংবা insert গুলোকে Replica ডাটাবেসগুলোতে replicate করতে লাগে, সেই সময়টি হচ্ছে Replication Lag।

Replication Lag এর জন্য একটি সমস্যা তৈরী হয়। যেমন, Master Database এ update কিংবা insert হলে তা replica ডাটাবেসগুলোতে replicate করতে গেলে যদি Replication Lag এর সময় বেশি হয়, তাহলে replicate করার সময় যদি read (replica database এ) read request আসে তখন different value অর্থাৎ inconsistent data রিড করার সুযোগ থাকে।

<p align="center">
  <img src="sections/database-replication/images/db-replication-1.png" alt="replication">
</p>

## Consistency Model

### Synchronous Replication

নতুন কোনো write অপারেশন যখন Master ডাটাবেসে প্রয়োগ করা হয়, তখন Master ডাটাবেস প্রথমে সেই ভ্যালু নিজের মধ্যে আপডেট করবে, তারপর (read) replica ডাটাবেসগুলোতে write অপারেশন প্রয়োগ করতে বলবে, replica ডাটাবেসগুলোতে write অপারেশন হয়ে গেলে তখন এরা Master ডাটাবেসকে acknowledgement পাঠাবে, তখন Master ডাটাবেস নিশ্চিত হবে সব replica ডাটাবেসে consistent ভ্যালু আছে।

<p align="center">
  <img src="sections/database-replication/images/db-replication-2.png" alt="replication">
</p>

কোনো কারণে ভ্যালু update করার সময় কোনো replica ডাটাবেস নষ্ট কিংবা বন্ধ হয়ে গেলে, master database যখন দেখবে সেই নষ্ট হওয়া ডাটাবেস থেকে কোনো acknowledgement আসছে না তখন সেই ভ্যালুর আপডেট নিজের এবং বাকি replica ডাটাবেসগুলোতে করবে না কিংবা রিভার্ট করা হতে পারে।

### Asynchronous Replication

এতে নতুন কোনো write অপারেশন যখন Master ডাটাবেসে প্রয়োগ করা হয়, তখন Master ডাটাবেস প্রথমে সেই ভ্যালু নিজের মধ্যে আপডেট করবে, তারপর (read) replica ডাটাবেসগুলোতে write অপারেশন প্রয়োগ করতে বলবে, কিন্তু Master ডাটাবেস কোনো acknowledgement এর অপেক্ষা করবে না।

Master ডাটাবেস ডেটা নিজের মধ্যে আপডেট করে বাকি Read Replica ডাটাবেসে আপডেট করার জন্য বলে দিবে, কোনো প্রকারের acknowledgement ছাড়া। এতে করে Master ডাটাবেস কোনো Read ডাটাবেসের সাথে নির্ভর থাকবে না।

## Database Replication এর সুবিধাগুলো

- Performance: যেহেতু সবধরনের Write, Update and Delete Master Database এ হবে এবং সবধরনের Read Slave Database এ হবে সেহেতু একাধিক Query Parallely সংঘটিত হবে যার ফলে Performance Better হবে।

- Reliability: যদি কোনো Database Server নষ্ট হয়ে যায় তবুও আমরা সেই ডেটা অন্য কোনো Database Server এ পাব। ডেটা নষ্ট হওয়ার কোনো সুযোগ নেই।

- Availability: কোনো Database Server নষ্ট হয়ে যায় তখন আমরা অন্য Database Server থেকে ডেটা নিয়ে আমাদের System/Website কে সচল রাখতে পারি।

- Reduce Latency: একাধিক Database Server(Slave Database) থাকার ফলে Latency Time reduce হয়।

## কিছু ফ্যাক্টগুলো

- কোনো কারণে যেকোনো Slave Database নষ্ট হয়ে গেলে অন্য Slave Database থেকে ডেটা নেয়া যায়।

- Master Database নষ্ট হয়ে গেলে, কোনো Slave Database সেই নষ্ট Master Database কে Replace করবে। পরে নতুন Slave Database তৈরি হয়ে পুরনো Slave Database কে Replace করবে।

## কিভাবে AWS RDS multi az read replicas; disaster recovery জন্য কাজ করে?

ডাটাবেস সিস্টেমকে disaster recover করতে আমরা AWS RDS এর multi-az read replica feature ব্যবহার করতে পারি।

একই region এর মধ্যে আমরা একাধিক Availability Zone থাকবে এবং তাদের ভিতর আমরা Database Instance রাখতে পারি। একটি Availability Zone এ আমরা Master Database রাখবো এবং বাকিগুলোতে Read Replica Database থাকবে।

<p align="center">
  <img src="sections/database-replication/images/db-replication-3.png" alt="replication">
</p>

AWS RDS Synchronous Replication করে থাকে। কোনো কারণে Read Replica নষ্ট/বন্ধ হয়ে গেলে, AWS RDS নতুন Read রেপ্লিকা তৈরী করে নষ্ট কিংবা বন্ধ হয়ে যাওয়া Replica ডাটাবেসকে replace (প্রতিস্থাপন) করবে।


## Section 24: Caching

Caching একটি কৌশল যা দ্বারা কোন Expensive Response'কে কোনো মেমোরিতে রাখা হয়, যাতে বার বার আসা সেই রেস্পন্সের রিকোয়েস্ট কে দ্রুত রেসপন্সটি দিতে পারি। মূল সার্ভারে (যেমন ডাটাবেস) হিট করার পরিবর্তে ক্যাশিং সার্ভারে রিকোয়েস্ট করবে। এতে করে যে সুবিধাটুকু হবে,

- Read API রিকোয়েস্ট Fast হবে
- Latency Reduce হবে
- Fault Tolarence এর ঝুঁকি কমবে

<p align="center">
  <img src="./images/caching1.png" alt="Caching">
</p>

🔗 **আরও পড়ুন: ক্যাশিং**
## Cache Invalidation

আমরা ক্যাশিং সার্ভারে সবসময়ের জন্য ডেটা স্টোর করে রাখতে পারবো না, একটি নির্দিষ্ট সময় পর ক্যাশিং সার্ভারের ডেটা খালি করে, নতুন ডেটা ক্যাশিং সার্ভারে স্টোর করে রাখতে হবে, এই পদ্ধতি হল Cache Invalidation।

আমরা যদি Cache Invalidation না করি তাহলে আমরা ক্যাশিং সার্ভারে Stale ডেটা পাব, কারণ ডাটাবেসে যদি নতুন ডেটা থাকে তখন ক্যাশিং সার্ভারে পুরোতন ডেটা থাকবে। যার ফলে ক্লায়েন্ট সবসময় পুরোনো ডেটা পাবে। এই জিনিসটি avoid করতে Cache Invalidation করা হয়।

Invalidate করার একটি পদ্ধতি হল, একটি নির্দিষ্ট সময়সীমা সেট করে দেয়া এই নির্দিষ্ট সময়সীমার পর ডেটা ক্যাশিং সার্ভার থেকে ডিলিট হয়ে যাবে, এই নির্দিষ্ট সময়সীমাকে TTL(Time to live) বলে। আরেকটি পদ্ধতি হল, যখনই নতুন রিকোয়েস্ট আসবে তখন ডাটাবেস আপডেট হওয়ার পাশাপাশি আমরা ক্যাশিং সার্ভারে Cache Invalidation করব।

## Cache Eviction

এটি একটি প্রসেস যার মাধ্যমে ক্যাশিং সার্ভার থেকে ডেটা বাদ দেয়া হয় যাতে করে নতুন ডেটা সংরক্ষণ করতে পারে। ক্যাশিং সার্ভারে সবসময় একটি Limited Capacity থাকে, যখন ক্যাশিং সার্ভার সম্পূর্ণভাবে ভরে যায় তখন এই Cache Eviction পদক্ষেপ নেয়া লাগে, যাতে করে নতুন ডেটা ক্যাশিং সার্ভারে সংরক্ষন করা যায়।

### Cache Eviction Policy

- Least Recently Used (LRU): এই স্ট্রাটেজিতে সম্প্রতি ব্যবহৃত না হওয়া ডেটাগুলোকে ক্যাশিং সার্ভারে থেকে বাদ দেয়া হয়।
- First-in-first-out (FIFO): এই স্ট্রাটেজিতে যে ডেটা ক্যাশিং সার্ভারে প্রথমে প্রবেশ করবে সেই ডেটা প্রথমে বাদ যাবে।
- Least Frequently Used (LFU): এই স্ট্রাটেজিতে যে ডেটা যত কমবার ব্যবহৃত হয়েছে সেই ডেটাগুলোকে ক্যাশিং সার্ভারে থেকে বাদ দেয়া হয়।

## Distributed Cahing

এটি একটি সিস্টেম যেখানে একাধিক ক্যাশিং সার্ভার থাকবে এবং কোনো নেটওয়ার্কের একাধিক নোডে বার বার আসা সেই রেস্পন্সের রিকোয়েস্টকে দ্রুত রেসপন্সটি একাধিক নোডে ডিস্ট্রিবিউট করতে পারে।

<p align="center">
  <img src="sections/caching/images/distributed_caching.png" alt="Distributed Caching" />
</p>

### কেন আমাদের Distributed Cahing এর প্রয়োজন?

আমাদের সিস্টেমকে স্কেল করতে। আমাদের ক্যাশিং সিস্টেমকে Resilient/Fault Tolerant করতে আমাদের Distributed Cahing প্রয়োজন।

## Caching Strategy

৫ প্রকারের Caching Strategy বিদ্যমান।

### Cache-aside:

- প্রথমে Client Application সার্ভারে request করবে, তারপর Application সার্ভার প্রথমে ক্যাশিং সার্ভারকে হিট করবে,,
- যদি ডেটা ক্যাশিং সার্ভারে বিদ্যমান থাকে তাহলে ক্যাশিং সার্ভার সেই ডেটা Application সার্ভারকে দিবে এবং Application সার্ভার সেই ডেটা Client কে দিবে।
- যদি ডেটা ক্যাশিং সার্ভারে বিদ্যমান না থাকে তাহলে Application সার্ভার Database হিট করবে এবং ডেটা সংগ্রহ করে ক্যাশিং সার্ভারে রাখবে এবং তারপর সেই ডেটা ইউজার কে রিটার্ন করবে।

<p align="center">
  <img src="sections/caching/images/cache_aside.png" alt="Cache Aside" />
</p>

#### Pros of cache-aside

- read-heavy application এর জন্য উত্তম।
- Cache server ডাউন থাকলেও request ব্যর্থ হওয়ার সুযোগ নাই, যেহেতু তখন ডাটাবেসে থেকে ডেটা নিবে।

#### Cons of cache-aside

- নতুন ডেটা Read এর ক্ষেত্রে সবসময় cache miss হবে।

Memcached এবং Redis, cache-aside caching strategy follow করে।

### Read-through:

- প্রথমে Client Application সার্ভারে request করবে, তারপর Application সার্ভার প্রথমে ক্যাশিং সার্ভারকে হিট করবে,
- যদি ডেটা ক্যাশিং সার্ভারে বিদ্যমান থাকে তাহলে ক্যাশিং সার্ভার সেই ডেটা Application সার্ভারকে দিবে এবং Application সার্ভার সেই ডেটা Client কে দিবে।
- যদি ডেটা ক্যাশিং সার্ভারে বিদ্যমান না থাকে তাহলে ক্যাশিং সার্ভার Database হিট করবে এবং ডেটা সংগ্রহ করে ক্যাশিং সার্ভারে রাখবে এবং তারপর সেই ডেটা Application সার্ভারকে রিটার্ন করবে।
- তারপর Application সার্ভার সেই ডেটা'টি ক্লায়েন্টকে দিবে।

<p align="center">
  <img src="sections/caching/images/read_through.png" alt="Read-through" />
</p>

#### Pros of Read-through

- read-heavy application এর জন্য উত্তম।
- Application Server এ কোনো প্রকারের Data Fetching হবে না।

#### Cons of Read-through

- নতুন ডেটা Read এর ক্ষেত্রে সবসময় cache miss হবে।

### Write Around

- প্রথমে Client Application সার্ভারে write রিকোয়েস্ট করবে।
- Application Server সরাসরি ডাটাবেসে value update করবে।
- Application Server ক্যাশিং সার্ভারে ডাটা Dirty হিসেবে যোগ করবে। যাতে করে পরবর্তী সময় Read রিকোয়েস্ট আসলে বুজা যায় ডাটা Stale।

<p align="center">
  <img src="sections/caching/images/write_around.png" alt="Write Around" />
</p>

#### Pros of Write Around

- Inconsistency issue resolve করে between Cache and Database।

(বিস্তারিত চলমান)


## Section 25: Content Delivery Network

Content Delivery Network অথবা CDN, এটি একটি সিস্টেম যেখানে একাধিক সার্ভার আমাদের ভৌগোলিক এর আসেপাশে থাকে, যাতে আমরা খুব দ্রুত কন্টেন্ট পেতে পারি। কন্টেন্টটি হতে পারে JS, CSS, Images কিংবা Videos।

<p align="center">
  <img src="./images/cdn-1.png" alt="cdn">
</p>

আমাদের CDN সার্ভার যদি India তে থাকে আর আমরা Bangladesh থেকে content request করি তাহলে খুব তাড়াতাড়ি content পাব। কারণ তখন Latency কমে যাবে।
আর আমরা Bangladesh থেকে England-এ যেখানে মূল সার্ভার আছে, সেখানে কনটেন্ট এর জন্য request করলে Latency স্বাভাবিকভাবে বৃদ্ধি পাবে, যেহেতু দুই দেশের দূরত্ব বেশি।

যে যে লোকেশনে CDN সার্ভার আছে সেই লোকেশনগুলোকে Point of Presence বা PoP বলে। যে সার্ভার PoP এর ভিতরে থাকে তাকে Edge Server বলে।

🔗 **আরও পড়ুন: কনটেন্ট ডেলিভারি নেটওয়ার্ক**
## CDN এর উপকারিতা

- Reduce Latency: CDN এর ব্যবহারের মাধ্যমে Latency reduce করা যায়। যার ফলে পেইজের লোড টাইম কমে যায়।

- Reduce Bandwidth Cost: CDN সার্ভার যেহেতু আমাদের geographically(ভৌগোলিক) এর আসেপাশে থাকে, সেজন্য Bandwidth Cost reduce করা যায়।

- Ensure Content Availability: একটি CDN সার্ভার যদি নষ্ট কিংবা offline হয়ে যায়, তখন অন্য একটি CDN সার্ভার সেই কনটেন্ট ডেলিভার করতে পারবে। এভাবে আমরা Availability ensure করতে পারি।

- Handle DDoS Attack: Attacker যখন multiple রিকোয়েস্ট DDoS করার জন্য করবে, তখন সেই রিকোয়েস্টগুলো CDN সার্ভার handle করবে, আর আমাদের মূল origin সার্ভার অক্ষত থাকবে।

## CDN এর ব্যবহার: Real-time Streaming

Real-time Streaming সিস্টেম যেখানে Videos কিংবা Audio সার্ভ করা হয় সেখানে সাধারণত CDN ব্যবহার করা হয়,
যাতে Bandwidth Cost কমানো যায়, সহজে Scale করা যায় এবং Delivery Time দ্রুত করা যায়। আরো জানতে চাইলে <a href="https://youtu.be/EJQkBd_-CMo" target="_blank">এটি</a> দেখতে পারেন।


## Section 26: Rate Limiter

Rate Limiter একটি প্রসেস, যেখানে ক্লায়েন্ট থেকে আসা রিকোয়েস্ট সার্ভারে যাওয়ার পূর্বে রিকোয়েস্টটি কন্ট্রোল করা হয়। একটি নির্দিষ্ট সময়ের মধ্যে একটি নির্দিষ্ট পরিমাণ রিকোয়েস্ট Rate Limiter এর মাধ্যমে সার্ভার রিকোয়েস্ট গ্রহণ করে থাকে। নির্দিষ্ট পরিমানের চেয়ে রিকোয়েস্ট বেশি হয়ে গেলে Rate Limiter রিকোয়েস্টগুলোকে block করে ফেলে, যার ফলে রিকোয়েস্টগুলো আর সার্ভারে যেতে পারে না।

এখানে মূল পয়েন্ট ২টি, নির্দিষ্ট সময় এবং নির্দিষ্ট পরিমাণ রিকোয়েস্ট।

<p align="center">
  <img src="./images/rate-limiter.png" alt="rate limiter">
</p>

উপরের ছবিতে দেখা যাচ্ছে, রিকোয়েস্ট এবং রেস্পন্সের মধ্যে middleware হিসেবে rate limiter আছে।

🔗 **আরও পড়ুন: রেইট লিমিটার**
## কেন Rate Limiter?

- Denial of Service(DoS) attack প্রতিরোধ করতে পারি।
- অপ্রয়োজনীয় রিকোয়েস্ট block করার মাধ্যমে আমরা cost reduce করতে পারি।

## কোথায় Rate Limiter ইমপ্লিমেন্ট করবো?

আমরা চাইলে client-side কিংবা server-side এ ইমপ্লিমেন্ট করতে পারবো। তবে server-side এ ইমপ্লেমেট করা better। কারন client-side এত reliable না।

## HTTP Rate Limiter

<p align="center">
  <img src="sections/rate-limiter/images/http-rate-limiter.png" alt="http rate limiter">
</p>

যখন ক্লায়েন্ট নির্দিষ্ট সময়ের ভিতর নির্দিষ্ট পরিমাণ এর থেকে বেশি http রিকোয়েস্ট সেন্ড করে তখন HTTP status code 429 যার মানে To many request পাঠিয়ে দেয়া হয়।

## Rate Limiter এর Throttle কিসের উপর নির্ভর করে তৈরী করবো?

আপনি চাইলে নির্দিষ্ট IP ধরে কিংবা নির্দিষ্ট user ID ধরে rate limiter এর throttle তৈরী করতে পারেন। IP ধরে করলে করলে নির্দিষ্ট সময়ের ভিতর নির্দিষ্ট IP থেকে নির্দিষ্ট পরিমাণের থেকে বেশি রিকোয়েস্ট আসলে তা block হয়ে যাবে।

## Rate Limiting Algorithms

কিছু Algorithm যা ব্যবহার করে আমরা Rate Limit ইমপ্লিমেন্ট করতে পারব।

- Token Bucket
- Leaky Bucket
- Fixed Window Counter
- Sliding Window Log
- Sliding Window Counter

এখানে আমরা শুধু Token Bucket এবং Leaky Bucket সম্পর্কে জানব।

### Token Bucket

Rate Limit ইমপ্লিমেন্ট করার জন্য এটি খুবই জনপ্রিয় algorithm। এটি যেরকম কাজ করে থাকে,

নির্দিষ্ট capacity সম্পন্ন একটি bucket থাকবে। bucket এর ভিতর নির্দিষ্ট পরিমান token থাকবে।

যখন একটি request আসবে bucket থেকে একটি token বাদ দেয়া হবে। এরকম আরেকটি request আসলে আরেকটি token বাদ দেয়া হবে।

এরকম bucket থেকে সব token শেষ হয়ে গেলে তখন আর কোনো রিকোয়েস্ট নেওয়া হবে না কিংবা প্রসেস করা হবে না।

<p align="center">
  <img src="sections/rate-limiter/images/token-bucket.png" alt="token bucket">
</p>

এরকম আমরা অতিরিক্ত রিকোয়েস্টগুলোকে আমাদের সিস্টেম থেকে বিরত রাখতে পারবো।

একবার bucket খালি হয়ে গেলে আমরা আবার bucket এর মধ্যে token দিয়ে পূর্ণ করে রিকোয়েস্টগুলোকে প্রসেস করতে পারবো।

### Leaky Bucket

Leaky Bucket algorithm কিন্তু Token Bucket algorithm এর মত। পার্থক্য হল Leaky Bucket algorithm এ রিকোয়েস্টগুলো একটি constant rate এ প্রসেস হয়ে থাকে, মানে রিকোয়েস্টগুলো FIFO মানে First-in-first-out মেনে প্রসেস হয়ে থাকে।

<p align="center">
  <img src="sections/rate-limiter/images/leaky-bucket.png" alt="leaky bucket">
</p>

Bucket এ যদি তার capacity থেকে কম Token থাকে তাহলে নতুন Token কিংবা request bucket এর ভিতর প্রবেশ করবে আর তারপর FIFO অনুযায়ী প্রসেস হবে।

এখন bucket এ যদি capacity অনুযায়ী Token থাকে তাহলে নতুন টোকেন আর bucket এ প্রবেশ করতে পারবে না।


## Section 27: CAP Theorem

এটি একটি কনসেপ্ট বা থিওরি যা দ্বারা বুজা যায়, একটি Distributed System এ উল্লিখিত তিনটি প্রোপার্টি থেকে দুইটি প্রোপার্টি সবসময় মেনে চলবে।

- C মানে Consistency
- A মানে Availability
- P মানে Partition Tolerance

Consistency হচ্ছে একটি ট্রান্সেকশন (Transection) শেষ হওয়ার পর সব নোডে সবসময় consistent বা একই value থাকবে।

Availability মানে হচ্ছে প্রতিটি read এবং write রিকোয়েস্ট হয় প্রসেস(process) হবে না হয় কোনো message পাবে যে অপারেশন(request) প্রসেস(process) হচ্ছে না।

Partition Tolerance হচ্ছে একাধিক নোড একে অপরের সাথে কানেকশন(connection) নষ্ট হলেও, read এবং write অপারেশন ঠিকভাবে প্রসেস হবে।

🔗 **আরও পড়ুন: ক্যাপ থিওরাম**
## Consistency, Availability & Partition Tolerance in Distributed System

কোনো Distributed System এ Consistency, Availability এবং Partition Tolerance সব একসাথে মিলে কাজ করতে পারবে না, হয় আপনাকে Consistency কিংবা Availability কিংবা Partition Tolerance secrifice করতে হবে। তারমানে যা দাড়ালো, সিস্টেমে 

* Consistency আর Availability থাকবে।
* Consistency আর Partition Tolerance থাকবে।
* Availability আর Partition Tolerance থাকবে।

এই তিনটি থেকে যেকোনো একটি মেনে চলবে।

### যদি সিস্টেমে Consistency আর Availability মেনে চলে

Distributed System এ Consistency আর Availability মেনে চলি তারমানে সিস্টেমের সব নোডে সবসময় Consistent Value থাকবে এবং প্রতিটি নোড সবসময় Available থাকবে। 

<p align="center">
  <img src="sections/cap-theorem/images/cap-1.png" alt="cap theorem">
</p>

এখন যদি দুটি নোডের মধ্যে Partition Tolerance হয়,

<p align="center">
  <img src="sections/cap-theorem/images/cap-2.png" alt="cap theorem">
</p>

Node 1 এ কোনো ভ্যালু আপডেট হলে সেটি আর Node 2 এর সাথে sync হতে পারবে না। তাহলে consistency আর থাকবে না। এখন সিস্টেমের consistency আর availability একসাথে Maintain রাখতে হলে তখন আমাদের সিস্টেম বন্ধ রাখতে হবে।

### যদি সিস্টেমে Consistency আর Partition Tolerance মেনে চলে

Distributed System এ Consistency আর Partition Tolerance মেনে চলি তারমানে সিস্টেমের সব নোডে সবসময় Consistent Value থাকবে এবং Partition Tolerance হলে অন্য নোড আর available থাকবে না।

<p align="center">
  <img src="sections/cap-theorem/images/cap-3.png" alt="cap theorem">
</p>

Node 1 এবং Node 2 এর মধ্যে Partition Tolerance হওয়ার কারণে Node 2 এর ভ্যালু মানে a এর মানের কোনো পরিবর্তন হয় নাই। তখন consistency বজায় রাখার জন্য Node 2 সাময়িক সময়ের জন্য বন্ধ করতে হবে, মানে Node 2 এর availability secrifice করা। 

<p align="center">
  <img src="sections/cap-theorem/images/cap-4.png" alt="cap theorem">
</p>

### যদি সিস্টেমে Availability আর Partition Tolerance মেনে চলে

Distributed System এ Availability আর Partition Tolerance মেনে চলি তারমানে সিস্টেমের সব নোডে সবসময় Consistent Value থাকা লাগবে না সিস্টেমের সব নোড Available থাকতে হবে যদি Partition Tolerance হয়ে থাকে। তারমানে এখানে consistency সেক্রিফাইস করতে হবে। 

<p align="center">
  <img src="sections/cap-theorem/images/cap-3.png" alt="cap theorem">
</p>

সুতরাং যেকোনো ডিস্ট্রিবিউটেড সিস্টেমে একসাথে Consistency, Availability, Partition Tolerance চলবে না। 

## Section 29: Polling, Web Socket and Server-Sent Events

Polling মানে হচ্ছে client regular interval এ server কে বার বার ডেটার জন্য রিকোয়েস্ট করবে। যেমন, ক্লায়েন্ট প্রতি ৫ সেকেন্ড পর পর সার্ভার কে রিকোয়েস্ট করবে আর সার্ভার তার রেসপন্স দিবে।

<p align="center">
  <img src="./images/polling.png" alt="polling">
</p>

Polling এর সবচেয়ে বড় সমস্যা হচ্ছে অতিরিক্ত Bandwidth ব্যবহার হওয়া।

Web Socket মানে হচ্ছে Socket এর মাধ্যমে সার্ভার এবং ক্লায়েন্ট এর মধ্যে একটি কানেকশন তৈরী হবে যা ক্লায়েন্ট বা সার্ভার যতক্ষন পর্যন্ত disconnected না হচ্ছে ততক্ষন পর্যন্ত কানেকশন থাকবে। ক্লায়েন্ট এখানে সার্ভারকে বার বার রিকোয়েস্ট করা লাগবে না, যেহেতু কানেকশন আছে ক্লায়েন্ট এবং সার্ভার এর মধ্যে সেহেতু কোনো প্রকারের event সার্ভারে সংঘটিত হলে সার্ভার এর রেসপন্স ক্লায়েন্টকে পাঠিয়ে দিবে। Web Socket টেকনোলজি ব্যবহার করে Chat Application বানানো যায়।

<p align="center">
  <img src="./images/web_socket.png" alt="web_socket">
</p>

Web Socket এ সার্ভার এবং ক্লায়েন্টের মধ্যে একটি কানেকশন তৈরী হয়, অর্থাৎ সার্ভারের ভিতর ক্লায়েন্টের কিছু ইনফরমেশন থাকতে হবে যাতে সার্ভার ক্লায়েন্টকে ট্র্যাক করতে পারে। এজন্য এটিকে Stateful Architecture বলা হয়।

🔗 **আরও পড়ুন: পোলিং, ওয়েব সকেট এবং সার্ভার সেন্ট ইভেন্টস**
## Polling এর টাইপ

### Short Polling

এটি এক প্রকারের Polling, যেখানে ক্লায়েন্ট একটি সময় পর পর সার্ভারকে রিকোয়েস্ট করবে সার্ভার সেই রিকোয়েস্ট এর রেসপন্স করবে, সার্ভারের কাছে যদি সেই ডেটার রেসপন্স না থাকে তাহলে empty response পাঠাবে।

<p align="center">
  <img src="sections/polling-web-socket-server-sent-events/images/short-polling.png" alt="short-polling">
</p>

### Long Polling

এখানে ক্লায়েন্ট একটি সময় পর পর সার্ভারকে রিকোয়েস্ট করবে সার্ভার সেই রিকোয়েস্ট এর রেসপন্স করবে, এখন যদি সার্ভার এর কাছে রেসপন্স না থাকে তাহলে সার্ভার একটি নির্দিষ্ট সময় অপেক্ষা করবে নির্দিষ্ট সময়ের ভিতর সার্ভারে ডেটা আসে তাহলে ডেটা সার্ভার রেসপন্স আকারে ক্লায়েন্ট কে দিয়ে দিবে না হয় অপারেশন Timeout হয়ে যাবে,তখন ক্লায়েন্ট আবার নির্দিষ্ট সময় পর সার্ভারকে রিকোয়েস্ট করবে।

<p align="center">
  <img src="sections/polling-web-socket-server-sent-events/images/long-polling.png" alt="long-polling">
</p>

## Web Socket কিভাবে কাজ করে?

Web Socket একটি single TCP কানেকশন এর মাধ্যমে তৈরী হওয়া Bidirectional Communication Protocol। প্রসেস শুরু হয়,

- TCP Connection: client প্রথমে সার্ভার এর সাথে TCP Connection তৈরী করবে। এটি HTTP প্রোটোকলের মাধ্যমে "WebSocket Handshake" নামক একটি বিশেষ অনুরোধ পাঠায় (Upgrade: websocket হেডার সহ)।

- Connection সবসময় open থাকা: Server যদি WebSocket সাপোর্ট করে, তবে এটি HTTP 101 Switching Protocols দিয়ে উত্তর দেয় এবং TCP সংযোগ WebSocket সংযোগে রূপান্তরিত হয়। একবার সংযোগ স্থাপিত হলে, এটি সবসময় খোলা থাকে। এই Open কানেকশন এর মধ্যে Data Transmit হবে।

- Connection বন্ধ: যখন কোনো এন্ড(client কিংবা server) নির্দিষ্টভাবে কানেকশন বন্ধ করলে, তখন কানেকশন সিস্টেম বন্ধ হবে। অন্যথায় কানেকশন সবসময় Open থাকবে।

### Web Socket এর সীমাবদ্ধতা

আপনি WebSocket ব্যবহার করে একটি চ্যাট অ্যাপ তৈরি করেছেন, যেখানে A এবং B নিজেদের মধ্যে চ্যাট করছে। যদি B-এর ইন্টারনেট সংযোগ বিচ্ছিন্ন হয়ে যায়, তাহলে কি চ্যাট স্বয়ংক্রিয়ভাবে নিষ্ক্রিয় হয়ে যাবে?

হ্যাঁ, যখন ইন্টারনেট সংযোগ বিচ্ছিন্ন হয়, তখন এটি ‘close’ ইভেন্ট ট্রিগার করবে।

আপনি এমন একটি মেকানিজম তৈরি করতে পারেন, যাতে A জানতে পারে যে B সংযোগ বিচ্ছিন্ন হয়েছে।

ধরুন A বার্তা পাঠিয়ে যাচ্ছে(B-এর ইন্টারনেট নাই), কিন্তু যদি কিছু সময় B-এর ইন্টারনেট পুনরায় চালু হয়, তাহলে B কী মেসেজগুলো পাবে যা A তাকে পাঠিয়েছিল যখন B-এর ইন্টারনেট বন্ধ ছিল?

B বার্তাগুলো সাথে সাথে পাবে না, যদি না সে chat page রিফ্রেশ করে বা ক্লায়েন্ট-সাইড লজিকে স্বয়ংক্রিয়ভাবে WebSocket সার্ভারের সাথে পুনরায় সংযোগ স্থাপনের ব্যবস্থা করা হয়।

এটাই(সাথে সাথে মেসেজ না পাওয়া) WebSocket এর সীমাবদ্ধতা।

## Server-Sent Events

(চলমান)


## Section 31: Message Queue

এটি একটি প্রসেস যেখানে এক বা একাধিক Producer থাকবে, যাদের কাজ হচ্ছে Message(এখানে message মানে রিকোয়েস্ট) Queue এর মধ্যে send করা এবং queue সেই রিকোয়েস্টগুলোকে প্রসেস করে বিভিন্ন consumer এর কাছে পাঠিয়ে দেয়।

<p align="center">
  <img src="./images/mq-1.png" alt="Message Queue">
</p>

সিস্টেমের Throughput বৃদ্ধি করার জন্য Message Queue ব্যবহার করা হয়।

Message Queue প্রতিটা Task কে Asynchronously প্রসেস করে থাকে, মানে একটি Task প্রসেস হয় তখন অন্য task এর উপর নির্ভর করে না।

পপুলার Streaming Service Netflix, Airbnb ইত্যাদি Message Queue ব্যবহার করে। Agoda তাদের Analytical Data, Real-time Monitoring এর Solution এর জন্য Message Queue ব্যবহার করে আসছে, 1.8 trillion events প্রতি দিন Message Queue এর মাধ্যমে প্রসেস করে আসছে।

আমরা যে কোনো Food Delivery সিস্টেমের কথা চিন্তা করি যদি, যেখানে একজন Delivery boy এর লাইভ লোকেশন আমরা যদি Pooling এর মাধ্যমে ৫ সেকেন্ড পর পর নিয়ে থাকি এবং কোন সময়ে কোন লোকেশনে ছিল সেটি ডাটাবেসের মধ্যে স্টোর করে রাখি। একজন ইউজার এর জন্য চিন্তা করলে আমাদের সিস্টেম ঠিকমতো কাজ করবে, ডাটাবেস স্টোর করে রাখবে।

কিন্তু আমাদের সিস্টেম একজন মানুষ ব্যবহার করবে না। হাজার হাজার Delivery boy এর লাইভ লোকেশন আমরা যদি সরাসরি ডাটাবেসে স্টোরে করে রাখি, তাহলে আমাদের সিস্টেম ক্র্যাশ করবে। কারণ ডাটাবেসের Throughput কম।

এই সমস্যার সমাধান আমরা Message Queue এর মাধ্যমে করতে পারব। ২ টি জনপ্রিয় Message Queue হচ্ছে,

- Kafka
- RabbitMQ

🔗 **আরও পড়ুন: মেসেজ কিউ**
## Kafka

Kafka খুবই জনপ্রিয় Message Queue। High-performance data pipelines, streaming analytics, data integration, এবং mission-critical applications গুলোর জন্য Kafka ব্যবহার করা হয়। 

## Components of Kafka

- Producer: Producer কিংবা Publisher যার কাজ হচ্ছে message pass করা। এখানে message হতে পারে API রিকোয়েস্ট।

- Cluster: Producer message টি Cluster এ pass করবে। Cluster এর ভিতর Topics, Broker এবং ZooKeeper থাকবে।

<p align="center">
  <img src="sections/message-queue/images/cluster.png" alt="Cluster">
</p>

- Broker: Cluster এর ভিতর Broker থাকে। এটি একটি সার্ভার যার কাজ হল message/data গ্রহণ এবং প্রসেস এর পর send করা। 

<p align="center">
  <img src="sections/message-queue/images/broker.png" alt="Broker">
</p>

- Topic: Topic মূলত Broker এর একটি Core Section, যার কাজ হল মেসেজগুলোকে Organize করা। Broker এর ভিতর এক বা একাধিক Topic থাকবে।

<p align="center">
  <img src="sections/message-queue/images/topic.png" alt="Topic">
</p>

Topic এর ভিতর Data Partitioning হয়ে থাকে। প্রতিটি Partition এ মূলত Set of Messages বিদ্যমান থাকে। প্রতিটি message identifie করা হয় partition এর offset দ্বারা। Messages গুলো partition এর শেষে যুক্ত হয় এবং অন্য দিক থেকে send করা হয়।

<p align="center">
  <img src="sections/message-queue/images/partition.png" alt="Partition">
</p>

প্রতিটি মেসেজ একটি Dedicated Partition এ চলে যাবে।

- Consumer: Consumer মূলত Topic থেকে Message নিয়ে থাকে। Topic এর Partition থেকে Message Consumer এ যায়।

<p align="center">
  <img src="sections/message-queue/images/consumer-1.png" alt="Consumer">
</p>

ছবিতে দুটি Partition এবং একটি Consumer আছে, Kafka এর আর্কিটেকচার অনুযায়ী একধিক Partition থেকে ডেটা consume করতে পারবে। 

<p align="center">
  <img src="sections/message-queue/images/consumer-2.png" alt="Consumer">
</p>

এখানে দুটি Partition এবং দুটি Consumer আছে, Kafka এই দুটি Partition এবং দুটি Consumer কে সমানভাবে ডিস্ট্রিবিউট (Auto Balancing) করে দিবে।

<p align="center">
  <img src="sections/message-queue/images/consumer-3.png" alt="Consumer">
</p>

যেহেতু ১টি Partition কে কেবল ১টি Consumer নিতে পারবে সেজন্য consumer 3 কিছু consume করতে পারবে না। 

- ZooKeeper: এটিতে মূলত Kafka Cluster এর information এবং Consumer এর details সংরক্ষন করা থাকে। এটি Active Broker এর একটি লিস্ট মেইনটেইন করে। যখন কোনো Broker নষ্ট হয়ে যায় কিংবা কোনো error হলে ZooKeeper একটি notification পাঠিয়ে দেয় Kafka'র কাছে। Kafka সার্ভারের জন্য ZooKeeper থাকা বাধ্যতামূলক।

<p align="center">
  <img src="sections/message-queue/images/zookeeper.png" alt="zookeeper">
</p>

## Real life Kafka use-cases

- Real-time Data Processing.
- Messaging System.
- Stream Processing.
- Event-driven Architecture.
- Log Aggregation.

## Section 33: Single Sign-On

Single Sign-On কিংবা SSO হল একটি Authentication Mechanism। যা user কে একাধিক প্লাটফর্ম (গুগল, ফেইসবুক, টুইটার) দিয়ে Authenticate করে দেয়, একটি নির্দিষ্ট credential মাধ্যমে।

<p align="center">
  <img src="./images/sso.png" alt="sso">
</p>

(বিস্তারিত চলমান)

## Section 34: Elasticsearch

এটি একটি NoSQL ভিত্তিক ডেটাবেস। মূলত এটিকে Distributed Search এবং Aggregation Engine হিসেবে ব্যবহার করা হয়। Elasticsearch এর ভিতর structured এবং unstructured data স্টোর করে রাখা যায়।

🔗 **আরও পড়ুন: ইলাস্টিকসার্চ**
## কেনো Elasticserach?

আমরা একটি scenario চিন্তা করি, আমাদের একটি e-commerce application আছে। যেখানে ৮০ লক্ষ প্রোডাক্ট আছে। এখন end user কোনো একটি প্রোডাক্ট এর keyword দিয়ে যখন সার্চ করবে তখন response time 400ms বা তার থেকেও বেশি হতে পারে।

আরেকটি scenario চিন্তা করি, আপনার একটি ব্লগ আছে, যেখানে end user এসে Full Text Search করছে মানে একটি sentence দিয়ে blog সার্চ করবে।

এরকম আরো অনেক scenario আছে। এসবের জন্য Elasticserach খুবই প্রয়োজনীয়।

## Elasticsearch এর structure

Elasticsearch এ কালামগুলোকে সাধারণত Field এবং Row গুলোকে Document বলে। এখানে মানে Elasticsearch এ টেবিলগুলোকে index বলা হয়।

## Elasticsearch কিভাবে GET রিকোয়েস্ট প্রসেস করে থাকে?

প্রথমে ক্লায়েন্ট GET রিকোয়েস্ট করবে সার্ভারকে, ব্যাকএন্ড সার্ভার নিজ থেকে Elasticsearch Instance এর মধ্যে GET রিকোয়েস্ট করবে। Elasticsearch server এর কাজ হল সেই query এর ইনডেক্স ভ্যালু রিটার্ন করে দেয়া, তা array আকারে হতে পারে। তারপর সেই ইনডেক্সগুলো দিয়ে ব্যাকএন্ড সার্ভার তখন মূল ডাটাবেস MySQL কিংবা Postgresql এ হিট করবে। অতঃপর MySQL সেই ইনডেক্স ভ্যালু দিয়ে সার্চ করে ডাটাগুলোকে ব্যাকএন্ড সার্ভারে পাঠিয়ে দিবে।

<p align="center">
  <img src="sections/elasticsearch/images/elasticsearch-get.png" alt="Elasticsearch">
</p>

## Mapping

Elasticsearch এর Mapping হল index এর মধ্যে কিভাবে Field কিভাবে স্টোর হবে তা নির্ধারণ করে থাকে। Field এর ডাটা টাইপ কেমন হবে তা বলে দেয়।

```
{
  "mappings": {
    "properties": {
      "name": { type: "text" },
      "email": { type: "text" },
      "username": { type: "text" },
      "age": { type: "text", index: false }
    }
  }
}
```

Elasticsearch এ সাধারণত সব field এ ইনডেক্স করা থাকে, আমরা চাইলে { index: false } দিতে পারব যদি নির্দিষ্ট field এর জন্য index প্রয়োজন না হয়।

## DSL Query

Domain Specific Language সংক্ষেপে DSL যা একটি JSON based query language। তা দ্বারা আমরা Elasticsearch এ query operation চালাতে পারি। উদাহরণ,

```
{
  "query": {
    "match": {
      "field_name": "search_term"
    }
  }
}
```

এখানে,

- query: query configuration শুরু হবে query অবজেক্টের ভিতর দিয়ে।
- match: কোন রকমের query থাকবে Full Text Search এর জন্য।
- field_name: কোন ফিল্ড search হবে এখানে বলে দিতে হয়। যদি আমরা description নামের field search করি তাহলে description দিতে হবে।
- search_term: যে টার্ম আমরা search করব তা এখানে বলে দিব।

DSL Query insertion এর জন্য সরাসরি ব্যবহৃত হয় না, আপনি Elasticsearch এর client library ব্যবহার করে insertion করতে পারবেন।


## Section 35: Bloom Filter

Bloom Filter একটি Probabilistic Data Structure। Hashing টেকনিক ব্যবহার করে এখানে ডেটা insert করা হয়। এটি খুবই Faster এবং মেমোরি Efficient।

Bloom Filter এর ব্যাপারে জানার পূর্বে Hashing কি জানা নেয়া যাক। একটি Hash Function নিজের প্যারামিটারে input নিয়ে থাকে এবং সেই input কে প্রসেস করে একটি ফিক্সড length এর unique identifier রিটার্ন করে।

উদাহরণ, ইনপুট 'david' হলে আউটপুট হবে 5

```js
// hash function
function generateHash(table_size, user) {
  let index;
  let user_length = user.length;

  index = user_length % table_size;
  return index;
}

generateHash(10, "david"); // 5
```

Bloom Filter Data Structure এ Hash function ব্যবহার করে আমরা set এর মধ্যে specific position এ element insert করতে পারি। তারপর set এর মধ্যে specific element সার্চ করতে পারি।

এর মধ্যে যখন আমরা নির্দিষ্ট element সার্চ করি তখন আমরা দুটি জিনিসের মধ্যে একটি পাবো,

- হয় possibly yes - মানে element, set এর মধ্যে থাকবে তবে না থাকার সামান্য কিছু সম্ভাবনা আছে।

- না হয় no - মানে element, set এর মধ্যে নাই।

এজন্য তাকে Probabilistic Data Structure বলা হয়।

🔗 **আরও পড়ুন: ব্লুম ফিল্টার**
## ব্লুম ফিল্টার এ insertion কিভাবে কাজ করে?

- শুরুতে bucket এর সব index এর ভ্যালু 0।

<p align="center">
  <img src="sections/bloom-filter/images/bf-1.png" alt="bloom filter">
</p>

- `generateHash(10, 'david')` এর রিটার্ন ভ্যালু 5, index 5 এর ভ্যালু 0 থেকে 1 বানানো হল, david এর একটি রেফারেন্স index 5 এ রাখবে।

<p align="center">
  <img src="sections/bloom-filter/images/bf-2.png" alt="bloom filter">
</p>

- `generateHash(10, 'lahin')` এরও রিটার্ন ভ্যালু 5, index 5 এ এখন ২ টি রেফারেন্স থাকবে।

<p align="center">
  <img src="sections/bloom-filter/images/bf-3.png" alt="bloom filter">
</p>

## ব্লুম ফিল্টার-এ সার্চ

আমরা যদি lahin সার্চ করতে যাই, `generateHash(10, 'david')` 5 রিটার্ন করবে। এখন index 5 এ কিন্তু david, lahin দুটি আছে এখানে Bloom Filter accurately বলতে পারবে না, সেজন্য বলবে থাকতেও পারে আবার নাও থাকতে পারে।

কিন্তু আমরা যদি john সার্চ করি তাহলে `generateHash(10, 'john')` 4 রিটার্ন করবে। যেহেতু index 4 এর ভ্যালু 0 সেজন্য Bloom Filter accurately বলতে পারবে john পাওয়া যায়নি।

## ব্লুম ফিল্টার-এ ডিলিট

যেহেতু index 5 এ দুটি ভ্যালুর রেফারেন্স আছে সেহেতু এখানে কোনো ভ্যালু Delete করা যাবে না।

## ব্লুম ফিল্টার এর সুবিধাগুলো

- constant time complexity
- constant space complexity
- no false negative


## Section 38: How OAuth2 works

OAuth2 হল এক প্রকারের Authorization Grant Technique। এটি Google, Facebook এর মত ওয়েবসাইট থেকে নির্দিষ্ট information আনতে পারে কোনো প্রকারের password এবং অন্যান্য sensitive information ছাড়া। এই নির্দিষ্ট information এ একটি Access Token থাকে যা দ্বারা আমরা নির্দিষ্ট রিসোর্স(হতে পারে কোনো ওয়েবসাইট এ Login) ব্যবহার করতে পারবো।

এটি যেভাবে কাজ করে,

ধরুন আপনি কোনো ওয়েবসাইটে লগইন করছেন। সেজন্য আপনি Continue with Google বাটন ক্লিক করলেন,

- প্রথমে ওয়েবসাইট (মানে ক্লায়েন্ট) Google-এর Authorization Server-এ একটি Authorization Request পাঠায়।

- Google ইউজারকে তার লগইন পেজে রিডাইরেক্ট করে, যেখানে সে Email ও Password Google-এর পেইজে ইনপুট দেয়।

- ইউজার যদি সফলভাবে লগইন করে এবং পারমিশন দেয়, তখন Google ক্লায়েন্টকে একটি Authorization Code পাঠায়।

- ক্লায়েন্ট সার্ভার এই Authorization Code ব্যবহার করে Google-এর Authorization Server-এ একটি Access Token এর জন্য রিকোয়েস্ট পাঠায়।

- Google একটি Access Token (এবং সম্ভব হলে ID Token) পাঠায় ক্লায়েন্ট সার্ভারকে।

- এরপর ক্লায়েন্ট এই Access Token ব্যবহার করে Google-এর Resource Server থেকে ইউজারের তথ্য (যেমন নাম, ইমেইল) সংগ্রহ করতে পারে।

<p align="center">
  <img src="./images/oauth2.png" alt="oauth2">
</p>

## Section 40: High Availability best practices by Netflix

Netflix High Availability নিশ্চিত করার জন্য কিছু টিপস শেয়ার করেছিল(যেগুলো এরা নিজে follow করে থাকে) যা আমাদের অনেক সিস্টেমের কাজে লাগবে,

- Regional deployment over global ones: Deployment আমরা region by region করবো, যাতে region এ impact টি observe করতে পারি। কোনো প্রকারের সমস্যা হলে আমরা Rollback করে পূর্বের স্টেট এ চলে যেতে পারবো, তখন অন্য region এর উপর কোনো নেগেটিভ ইমপ্যাক্ট পরবে না।

- Use Blue/Green deployment strategy: এই strategy তে Deploy করার সময় সিস্টেমের দুটি ভার্সন থাকে, Blue হল বর্তমান ভার্সন এবং green হল নতুন ভার্সন। Green ভার্সন টেস্ট করা হয়ে গেলে, সবকিছু ঠিক থাকলে আমরা Blue ভার্সন থেকে সবকিছু Green ভার্সনে নিয়ে যাব।

- Use deployment windows: Deployment আমরা office hour এবং off-peak এর সময় করব।

- Enable Chaos Monkey: এটি একটি Tool যা আমাদের production সার্ভারকে ক্র্যাশ করে দিতে পারে। এতে করে আমরা নিশ্চিত হতে পারব আমাদের সিস্টেমটি কত resilience।

- Deploy exactly what you tested to production: যে পার্ট এর টেস্টিং করা হয় সেই পার্ট Deploy করা হবে।

Original Post: https://netflixtechblog.medium.com/tips-for-high-availability-be0472f2599c

## Section 41: Real World Problems

একজন ভালো system designer হতে হলে, আমাদেরকে real-world সমস্যাগুলোর requirements এবং planning সঠিকভাবে বুজতে হবে। আমি এখানে কিছু সমস্যা এবং সেই সমস্যাগুলোর সমাধানের ধারা আমি বর্ণনা করছি।

- Design a URL Shortener
- [**Design a Highly Concurrent Wordcamp Event Booking System**](./sections/real-world-problems/wc-event-booking/README.md)
- [**Design a Highly Concurrent Wordcamp Event Booking System, with Performance and Consistency in mind**](./sections/real-world-problems/wc-event-booking-perf/README.md)
- Design a Scalable One to One and One to Many chat system
- Design an Image Service that supports ~5M uploads/hour (~1.39k uploads/sec)

## Section 42: Resources

- <a href="https://github.com/donnemartin/system-design-primer" target="_blank">System Design Primer by Donne Martin (free)</a>
- <a href="https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321" target="_blank">Designing Data Intensive Applications (paid)</a>
- <a href="amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119" target="_blank">System Design Interview by Alex Xu (paid)</a>
