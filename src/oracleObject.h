#ifndef ORACLEOBJECT__H
#define ORACLEOBJECT__H

#include "config.h"
#include "ocip_interface.h"

///////////////////////////////////////////////////////////////////////////
class OracleObject
{
public:
	// Constructor/Destructor
	OracleObject(const Config& config);
	~OracleObject();

	// Execute SQL
	bool execute(const std::string& sql);

	// Request page
	bool request(const propertyListType& cgi, const std::string& procedure, const propertyListType& parameters, std::wstring* page);

	// Status
	oracleError getOracleError() const {return m_OracleError;}

private:
	Config					m_Config;
	ocip::Environment*		m_environment;
	ocip::ConnectionPool*	m_connectionPool;
	oracleError				m_OracleError;

	// Request steps
	bool requestInit(ocip::Connection* connection, const propertyListType& cgi);
	bool requestRun(ocip::Connection* connection, const std::string& procedure, const propertyListType& parameters);
	bool requestPage(ocip::Connection* connection, std::wstring* page);

	// Error handling
	void reportError(int oracleStatus, OCIError* errhp, const std::string& message, const std::string& file, int line);

	// Disable copy
	OracleObject(const OracleObject&);
	OracleObject &operator=(const OracleObject&);
};

#endif // ORACLEOBJECT__H
