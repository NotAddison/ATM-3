import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:local_auth/local_auth.dart';
import 'package:local_auth/error_codes.dart' as auth_error;

class LocalAuthAPI {
  static final _auth = LocalAuthentication();

  static Future<bool> hasBiometrics() async {
    try {
      return await _auth.canCheckBiometrics;
    } on PlatformException catch (e) {
      print(e);
      return false;
    }
  }

  // List biometrics
  static Future<List<BiometricType>> getAvailableBiometrics() async {
    try {
      return await _auth.getAvailableBiometrics();
    } on PlatformException catch (e) {
      print(e);
      return [];
    }
  }

  // Check if fingerprint biometrics is available
  static Future<bool> hasFingerprint() async {
    try {
      final biometrics = await _auth.getAvailableBiometrics();
      return biometrics.contains(BiometricType.fingerprint);
    } on PlatformException catch (e) {
      print(e);
      return false;
    }
  }

  // Check if face biometrics is available
  static Future<bool> hasFace() async {
    try {
      final biometrics = await _auth.getAvailableBiometrics();
      return biometrics.contains(BiometricType.face);
    } on PlatformException catch (e) {
      print(e);
      return false;
    }
  }

  static Future<bool> authenticate() async {
    final hasBio = await hasBiometrics();
    if (!hasBio) return false;

    try {
      return await _auth.authenticate(
          localizedReason: "Reading your fingerprint...");
    } on PlatformException catch (e) {
      print(e);
      return false;
    }
  }
}
