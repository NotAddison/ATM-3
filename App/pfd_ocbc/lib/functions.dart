import 'dart:convert';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;
import 'package:local_auth/local_auth.dart';
import 'package:pfd_ocbc/local_auth_api.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

bool isShown = false;

// Send API Request (Auth Success)
// ignore: non_constant_identifier_names
void SendAPI() async {
  print("Send API");

  // FOR DEMO : Hard coded value, Should get & read from device
  var biohash = "43:51:43:a1:b5:fc:8b:b7:0a:3a:a9:b1:0f:66:73:a8";

  // Send POST Request
  var url = 'http://localhost:3000/auth/2/:hash';
  if (Platform.isAndroid) {
    url = 'http://10.0.2.2:3000/auth/2/:hash';
  }
  url = url.replaceAll(":hash", biohash);
  final response = await http.post(Uri.parse(url));
  debugPrint(">> SendAPI(): ${response.body}");

  // Reset Request
  ResetRequest();
}

// Send Webhook Request (Auth Failed)
// ignore: non_constant_identifier_names
void FailedVerification() async {
  debugPrint("Failed Verification");
  // Send discord webhook
  var url =
      'https://discord.com/api/webhooks/1036102961996247150/3keTw9J2paixnUpe39wytQEzo0hKP3RnoYWu6TZbhpctne6BKHRMOIntAoEDtECSftZH';
  final uri = Uri.parse(url);
  final header = {'Content-Type': 'application/json'};
  Map<String, dynamic> body = {
    "embeds": [
      {
        "color": 1014235,
        "title": "❌  Biometric Verification Failed",
        "description": "Platform: ${Platform.operatingSystem}",
        "timestamp": DateTime.now().toIso8601String()
      }
    ]
  };
  String jsonBody = jsonEncode(body);
  var response = await http.post(
    uri,
    headers: header,
    body: jsonBody,
  );
  debugPrint(">> Webhook: ${response.statusCode}");

  // Send API Failed Biometrics
  url = 'http://localhost:3000/auth/2/unknown';
  if (Platform.isAndroid) {
    url = 'http://10.0.2.2:3000/auth/2/unknown';
  }
  response = await http.post(Uri.parse(url));

  // Parse to JSON
  var res = jsonDecode(response.body);
  debugPrint(">> FAILED BIOMETRICS (API STATUS): ${res['valid']}");

  // Reset Request
  ResetRequest();
}

// Listen to API (When Site requires Biometrics)
// ignore: non_constant_identifier_names
Future<void> ListenRequest() async {
  var url = 'http://localhost:3000/auth/2/request';
  if (Platform.isAndroid) {
    url = 'http://10.0.2.2:3000/auth/2/request';
  }
  while (true) {
    final response = await http.get(Uri.parse(url));
    var res = jsonDecode(response.body);
    if (res["request"] == true) {
      debugPrint("Request: ${res["request"]}");

      // Validate Biometrics
      if (!isShown) {
        isShown = true;
        ValidateBio();
      }
    }

    // Wait 5 seconds before checking again
    await Future.delayed(Duration(seconds: 5));
  }
}

// Reset API Biometric Request status from true to false
// ignore: non_constant_identifier_names
void ResetRequest() async {
  var url = 'http://localhost:3000/auth/2/request/false';
  if (Platform.isAndroid) {
    url = 'http://10.0.2.2:3000/auth/2/request/false';
  }
  final response = await http.post(Uri.parse(url));
  var res = jsonDecode(response.body);
  debugPrint(">> ResetRequest(): Reset Status : ${res["request"]}");
}

void ValidateBio() async {
  final isAuthenicated = await LocalAuthAPI.authenticate();
  if (isAuthenicated) {
    // Send Biometrics to API
    SendAPI();
    isShown = false;
  } else {
    // Send Webhook > Auth Failed :: NOTE: Check is done on site
    print(">> AUTH Failed");
    FailedVerification();
    isShown = false;
  }
}
