package com.task.csvuploader.controller;

import com.task.csvuploader.entity.Employee;
import com.task.csvuploader.repository.EmployeeRepository;
import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    EmployeeRepository employeeRepository;
    @PostMapping("/upload")
    public List<Employee> uploadData(@RequestParam("file")MultipartFile file) throws Exception {
        List<Employee> employeeList = new ArrayList<>();
        InputStream is = file.getInputStream();
        CsvParserSettings settings = new CsvParserSettings();
        settings.setHeaderExtractionEnabled(true);
        CsvParser parser = new CsvParser(settings);
        List<Record> parsedRecords = parser.parseAllRecords(is);

        if (parsedRecords.size() != 0) {
            var headers = Arrays.asList(parsedRecords.get(0).getMetaData().headers());
            if (!headers.contains("name") || !headers.contains("email") || !headers.contains("phone")) {
                return null;
            }
        }
        parsedRecords.forEach(record -> {
            Employee employee = new Employee();
            employee.setName(record.getString("name"));
            employee.setEmail(record.getString("email"));
            employee.setPhone(record.getString("phone"));
            employeeList.add(employee);
        });

        employeeRepository.deleteAll();
        employeeRepository.saveAll(employeeList);

        return employeeList;
    }
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}