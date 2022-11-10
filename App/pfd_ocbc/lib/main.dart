import 'dart:convert';
import 'package:flutter/material.dart';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;
import 'package:local_auth/local_auth.dart';
import 'package:fluttertoast/fluttertoast.dart';

// Local Dart Files
import 'package:pfd_ocbc/local_auth_api.dart';
import 'package:pfd_ocbc/functions.dart';

var hasFaceID;
var hasTouchID;

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // CHECK OPERATING SYSTEM
  String os = Platform.operatingSystem; //in your code
  print("Operating System: $os");

  ListenRequest();

  // Run main app
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OCBC',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'PFD Demo'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffffffff),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisSize: MainAxisSize.max,
        children: [
          Expanded(
              flex: 1,
              child: OverflowBox(
                  maxHeight: double.infinity,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisSize: MainAxisSize.max,
                    children: [
                      Image(
                        image: const NetworkImage(
                            "https://images.squarespace-cdn.com/content/v1/5e421c8ee6a94d090daaed70/a21e1832-02f5-427d-9e09-a7051be1189a/Hong+Kong_Final+for+Animating_18May_New+Logob-01.jpg"),
                        height: MediaQuery.of(context).size.height,
                        width: MediaQuery.of(context).size.width,
                        fit: BoxFit.cover,
                      ),
                    ],
                  ))),
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children: [
              Card(
                margin: const EdgeInsets.fromLTRB(4, 10, 4, 30),
                color: Color.fromARGB(252, 245, 245, 245),
                shadowColor: Color(0xff000000),
                elevation: 1,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    const Padding(
                      padding: EdgeInsets.fromLTRB(0, 5, 0, 0),
                      child: Image(
                        image: NetworkImage(
                            "https://img.icons8.com/windows/512/000000/user.png"),
                        height: 100,
                        width: 120,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const Text(
                      "OCBC",
                      textAlign: TextAlign.center,
                      overflow: TextOverflow.clip,
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                        fontStyle: FontStyle.normal,
                        fontSize: 20,
                        color: Color(0xffde3a3a),
                      ),
                    ),
                    const Text(
                      "Dev Build - ATM 3.0",
                      textAlign: TextAlign.center,
                      overflow: TextOverflow.clip,
                      style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontStyle: FontStyle.normal,
                        fontSize: 13,
                        color: Color(0xffb4b4b4),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 20, horizontal: 10),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisSize: MainAxisSize.max,
                        children: [
                          MaterialButton(
                            onPressed: () {
                              ValidateBio();
                            },
                            color: Color(0xff1f1f1f),
                            elevation: 0,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(5.0),
                            ),
                            padding: EdgeInsets.all(16),
                            textColor: Color(0xffffffff),
                            height: 50,
                            minWidth: MediaQuery.of(context).size.width * 0.45,
                            child: const Text(
                              "Login",
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                                fontStyle: FontStyle.normal,
                              ),
                            ),
                          ),
                          MaterialButton(
                            onPressed: () {
                              Fluttertoast.showToast(
                                  msg: "404 - Singpass Unavailable",
                                  toastLength: Toast.LENGTH_SHORT,
                                  gravity: ToastGravity.TOP,
                                  timeInSecForIosWeb: 1,
                                  backgroundColor:
                                      Color.fromARGB(255, 240, 80, 69),
                                  textColor: Colors.white,
                                  fontSize: 16.0);
                            },
                            color: Color(0xffd13d3d),
                            elevation: 0,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(5.0),
                            ),
                            padding: EdgeInsets.all(16),
                            textColor: Color(0xffffffff),
                            height: 50,
                            minWidth: MediaQuery.of(context).size.width * 0.45,
                            child: const Text(
                              "Singpass 🔐",
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                                fontStyle: FontStyle.normal,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
