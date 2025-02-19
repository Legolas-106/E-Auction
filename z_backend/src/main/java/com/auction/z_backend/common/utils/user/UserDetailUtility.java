package com.auction.z_backend.common.utils.user;

import java.util.Map;

public class UserDetailUtility {
    private static final Map<String, String> MSME_UNIT_MAP = Map.of(
        "1", "Micro Unit as per MSME",
        "2", "Small Unit as per MSME",
        "3", "Medium Unit as per MSME",
        "4", "Ancillary Unit",
        "5", "Project Affected Person of this Company",
        "6", "SSI",
        "7", "Others"
    );

    private static final Map<String, String> COMPANY_TYPE_MAP = Map.of(
        "1", "Limited Company",
        "2", "Undertaking",
        "3", "Jointventure",
        "4", "Partnership",
        "5", "Others"
    );

    public static String getMSMEUnitType(String value) {
        return MSME_UNIT_MAP.getOrDefault(value, "Unknown MSME Unit Type");
    }

    public static String getCompanyType(String value) {
        return COMPANY_TYPE_MAP.getOrDefault(value, "Unknown Company Type");
    }
}
