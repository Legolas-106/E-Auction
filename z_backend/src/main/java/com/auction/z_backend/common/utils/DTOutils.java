package com.auction.z_backend.common.utils;

import java.lang.reflect.Field;

public class DTOutils {
    
    public static int countNonEmptyFields(Object dto) {
        if (dto == null) {
            return 0;
        }
        
        int count = 0;
        Field[] fields = dto.getClass().getDeclaredFields();
        
        for (Field field : fields) {
            field.setAccessible(true); // Allow access to private fields
            
            try {
                Object value = field.get(dto);
                
                if (value != null) {
                    count++;
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        
        return count;
    }
}
